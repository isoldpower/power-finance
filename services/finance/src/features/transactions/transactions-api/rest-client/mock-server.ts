import { v4 as uuidv4 } from "uuid";

import { LocalStorageMock } from "@internal/shared";
import {
	ApiError,
	createMatcher,
	delay,
	IdempotencyStore,
	paginate,
	stringifySortedQuery,
	validateFilter,
} from "@shared/api";
import { storedTransactionToDto, TRANSACTIONS_STORAGE_KEY } from "./mock-seed.ts";
import { TRANSACTION_CHAIN_LIMIT } from "../types.ts";
import type { IStorage } from "@internal/shared";
import type { FieldPolicy, SearchOrder } from "@shared/api";
import type { StoredTransaction } from "./mock-seed.ts";
import type {
	CategoryDto,
	ReceiptScanDto,
	TransactionChainEntryBody,
	TransactionCreateBody,
	TransactionDetailDto,
	TransactionPostingDto,
	TransactionDto,
	TransactionSearchField,
} from "../types.ts";
import type {
	ITransactionsRESTApiClient,
	TransactionCategoriesRequest, TransactionCategoriesResponse,
	TransactionAdjustRequest,
	TransactionAdjustResponse,
	TransactionChainDeleteRequest, TransactionChainDeleteResponse,
	TransactionChainRequest, TransactionChainResponse,
	TransactionDeleteRequest, TransactionDeleteResponse,
	TransactionGetRequest, TransactionGetResponse,
	TransactionListRequest, TransactionListResponse,
	TransactionPatchRequest, TransactionPatchResponse,
	TransactionPostRequest, TransactionPostResponse,
	TransactionScanRequest, TransactionScanResponse,
	TransactionSearchRequest, TransactionSearchResponse,
} from "./types.ts";

const WALLET_STORAGE_KEYS = ['wallets-v1', 'goals-v1'];

const SEED_CATEGORIES = ['Groceries', 'Dining', 'Transport', 'Bills', 'Shopping', 'Income'];

const SEED_SCAN: ReceiptScanDto = {
	amount: '86.40',
	currency: 'USD',
	confidence: 0.98,
	fields: [
		{ label: 'Merchant', value: 'Whole Foods Market', ai: true },
		{ label: 'Date', value: 'Jun 18, 2026', ai: true },
		{ label: 'Category', value: 'Groceries', ai: true },
		{ label: 'Wallet', value: 'Main Checking', ai: false },
	],
};

const SEARCH_FIELDS: FieldPolicy<TransactionSearchField> = {
	wallet_id: ['eq', 'neq', 'in'],
	chain_id: ['eq', 'neq', 'in'],
	amount: ['eq', 'gt', 'gte', 'lt', 'lte'],
	currency: ['eq', 'neq', 'in'],
	name: ['eq', 'neq', 'in', 'contains', 'icontains'],
	category: ['eq', 'neq', 'in', 'contains', 'icontains'],
	type: ['eq', 'neq', 'in'],
	origin: ['eq', 'neq', 'in'],
	created_at: ['gt', 'gte', 'lt', 'lte'],
};

const EXPENSE_ICON = '🛒';
const INCOME_ICON = '💼';
const WALLET_ICON = '💳';

interface StoredWalletRef {
	id: string;
	name: string;
	deleted_at: string | null;
}

const toCategoryId = (label: string): string => label.toLowerCase().replace(/\s+/g, '-');

const compareDesc = (left: string, right: string): number => (left < right ? 1 : left > right ? -1 : 0);

const DEFAULT_ORDER: SearchOrder = 'DESC';

const orderTransactions = (
	transactions: StoredTransaction[],
	order: SearchOrder = DEFAULT_ORDER,
): StoredTransaction[] => {
	const sign = order === 'ASC' ? -1 : 1;

	return [...transactions].sort((left, right) => {
		const byDate = compareDesc(left.created_at, right.created_at) * sign;
		if (byDate !== 0) return byDate;

		if (left.chain_id !== right.chain_id) {
			if (left.chain_id === null) return 1;
			if (right.chain_id === null) return -1;

			return left.chain_id < right.chain_id ? -1 : 1;
		}

		return compareDesc(left.id, right.id) * sign;
	});
};

const leafValue = (transaction: StoredTransaction, field: TransactionSearchField): string | null => {
	switch (field) {
		case 'wallet_id':
			return transaction.wallet_id;
		case 'chain_id':
			return transaction.chain_id;
		case 'amount':
			return transaction.amount;
		case 'currency':
			return transaction.currency;
		case 'name':
			return transaction.name;
		case 'category':
			return transaction.category;
		case 'type':
			return transaction.type;
		case 'origin':
			return transaction.origin;
		case 'created_at':
			return transaction.created_at;
	}
};

const matchesNode = createMatcher<StoredTransaction, TransactionSearchField>(
	SEARCH_FIELDS,
	(transaction, field) => leafValue(transaction, field),
	{ numericFields: ['amount'] },
);

class TransactionsMockRESTApiClient implements ITransactionsRESTApiClient {
	private readonly storage: IStorage<StoredTransaction>;
	private readonly postKeys = new IdempotencyStore<TransactionDto>();
	private readonly chainKeys = new IdempotencyStore<TransactionDto[]>();

	constructor(storageKey: string = TRANSACTIONS_STORAGE_KEY) {
		this.storage = new LocalStorageMock<StoredTransaction>(storageKey);
	}

	private wallets(): StoredWalletRef[] {
		return WALLET_STORAGE_KEYS.flatMap((key) => new LocalStorageMock<StoredWalletRef>(key).list());
	}

	private requireWallet(walletId: string): StoredWalletRef {
		const wallet = this.wallets().find((item) => item.id === walletId);

		if (!wallet) {
			throw new ApiError('validation_failed', `Wallet ${walletId} does not exist`, {
				details: [{
					field: 'wallet_id',
					code: 'not_a_reference',
					message: 'Wallet does not resolve to an existing resource',
				}],
			});
		}

		if (wallet.deleted_at !== null) {
			throw new ApiError('wallet_closed', `Wallet ${walletId} is closed`);
		}

		return wallet;
	}

	private settled(order?: SearchOrder): StoredTransaction[] {
		return orderTransactions(
			this.storage.list().filter((item) => item.deleted_at === null),
			order,
		);
	}

	private require(id: string): StoredTransaction {
		const transaction = this.storage.get(id);
		if (!transaction) throw new ApiError('not_found', `Transaction ${id} does not exist`);

		return transaction;
	}

	private toDto(transaction: StoredTransaction): TransactionDto {
		return storedTransactionToDto(transaction);
	}

	private postings(transaction: StoredTransaction): TransactionPostingDto[] {
		const money = { amount: transaction.amount, currency: transaction.currency };
		const counterpart = transaction.type === 'expense'
			? { title: transaction.category ?? transaction.name, icon: EXPENSE_ICON }
			: { title: transaction.name, icon: INCOME_ICON };

		return [
			{
				id: `${transaction.id}-counterpart`,
				account_id: `${transaction.id}-counterpart-account`,
				title: counterpart.title,
				debit: transaction.type === 'expense',
				position: 0,
				icon: counterpart.icon,
				money,
			},
			{
				id: `${transaction.id}-wallet`,
				account_id: transaction.wallet_id,
				title: transaction.wallet_name,
				debit: transaction.type === 'income',
				position: 1,
				icon: WALLET_ICON,
				money,
			},
		];
	}

	private toDetailDto(transaction: StoredTransaction, postings: TransactionPostingDto[]): TransactionDetailDto {
		const currencies = new Set(postings.map((posting) => posting.money.currency));
		const balanced = currencies.size <= 1;

		return {
			...this.toDto(transaction),
			evidence: transaction.evidence,
			postings,
			analysis: {
				balanced,
				comment: balanced ? null : 'Currency mismatch between the generated debit and credit legs',
			},
		};
	}

	private build(
		body: TransactionCreateBody,
		chainId: string | null,
		chainSize: number,
		createdAt: string,
	): StoredTransaction {
		const wallet = this.requireWallet(body.wallet_id);

		return {
			id: uuidv4(),
			name: body.name,
			created_at: createdAt,
			updated_at: null,
			deleted_at: null,
			amount: body.amount,
			currency: body.currency,
			type: body.type,
			origin: body.origin,
			wallet_id: wallet.id,
			wallet_name: wallet.name,
			category: body.category,
			chain_id: chainId,
			chain_size: chainSize,
			evidence: body.evidence,
		};
	}

	private orderChainEntries(entries: TransactionChainEntryBody[]): TransactionChainEntryBody[] {
		const byTemporaryId = new Map(entries.map((entry) => [entry.temporary_id, entry]));
		const ordered: TransactionChainEntryBody[] = [];
		const settled = new Set<string>();
		const visiting = new Set<string>();

		const visit = (entry: TransactionChainEntryBody): void => {
			if (settled.has(entry.temporary_id)) return;
			if (visiting.has(entry.temporary_id)) {
				throw new ApiError('chain_cycle', 'Chain entries form a cycle through their after references');
			}

			visiting.add(entry.temporary_id);
			if (entry.after !== null) {
				const parent = byTemporaryId.get(entry.after);
				if (!parent) {
					throw new ApiError('chain_unknown_reference', `Chain entry references unknown temporary id ${entry.after}`);
				}
				visit(parent);
			}
			visiting.delete(entry.temporary_id);
			settled.add(entry.temporary_id);
			ordered.push(entry);
		};

		entries.forEach(visit);

		return ordered;
	}

	public async list(payload: TransactionListRequest): Promise<TransactionListResponse> {
		await delay();

		const page = paginate(this.settled(), payload.params, stringifySortedQuery({ scope: 'list' }));

		return {
			data: page.items.map((item) => this.toDto(item)),
			meta: { ...page.meta, cached: false },
		};
	}

	public async get(payload: TransactionGetRequest): Promise<TransactionGetResponse> {
		await delay();

		const transaction = this.require(payload.id);
		return {
			data: this.toDetailDto(transaction, this.postings(transaction)),
			meta: { cached: false },
		};
	}

	public async search(payload: TransactionSearchRequest): Promise<TransactionSearchResponse> {
		validateFilter(SEARCH_FIELDS, payload.data.filter_body);

		await delay();

		const order = payload.params?.order ?? DEFAULT_ORDER;
		const matching = this.settled(order).filter((item) => matchesNode(item, payload.data.filter_body));
		const page = paginate(
			matching,
			payload.params,
			stringifySortedQuery({ filter: payload.data.filter_body, order }),
		);

		return {
			data: page.items.map((item) => this.toDto(item)),
			meta: { ...page.meta, cached: false },
		};
	}

	public async post(payload: TransactionPostRequest): Promise<TransactionPostResponse> {
		this.postKeys.require(payload.idempotencyKey);

		const replay = this.postKeys.replay(payload.idempotencyKey, payload.data);
		if (replay) return { data: replay, meta: { idempotent_replay: true } };

		await delay();

		const transaction = this.build(payload.data, null, 0, new Date().toISOString());
		this.storage.add(transaction);

		const dto = this.toDto(transaction);
		this.postKeys.remember(payload.idempotencyKey, payload.data, dto);

		return { data: dto, meta: { idempotent_replay: false } };
	}

	public async patch(payload: TransactionPatchRequest): Promise<TransactionPatchResponse> {
		await delay();

		const transaction = this.require(payload.id);
		const updated: StoredTransaction = {
			...transaction,
			name: payload.data.name ?? transaction.name,
			category: payload.data.category === undefined ? transaction.category : payload.data.category,
			evidence: payload.data.evidence === undefined ? transaction.evidence : payload.data.evidence,
			updated_at: new Date().toISOString(),
		};

		this.storage.remove(transaction);
		this.storage.add(updated);

		return { data: this.toDto(updated), meta: {} };
	}

	public async adjust(payload: TransactionAdjustRequest): Promise<TransactionAdjustResponse> {
		await delay();

		const transaction = this.require(payload.id);
		if (transaction.deleted_at !== null) {
			throw new ApiError('conflict', `Transaction ${payload.id} is cancelled`);
		}

		const adjusted: StoredTransaction = {
			...transaction,
			amount: payload.data.amount,
			updated_at: new Date().toISOString(),
		};

		this.storage.remove(transaction);
		this.storage.add(adjusted);

		return { data: this.toDto(adjusted), meta: {} };
	}

	public async delete(payload: TransactionDeleteRequest): Promise<TransactionDeleteResponse> {
		await delay();

		const transaction = this.require(payload.id);
		const cancelled: StoredTransaction = {
			...transaction,
			deleted_at: transaction.deleted_at ?? new Date().toISOString(),
		};

		this.storage.remove(transaction);
		this.storage.add(cancelled);

		return { data: this.toDto(cancelled), meta: {} };
	}

	public async postChain(payload: TransactionChainRequest): Promise<TransactionChainResponse> {
		this.chainKeys.require(payload.idempotencyKey);

		const replay = this.chainKeys.replay(payload.idempotencyKey, payload.data);
		if (replay) {
			return {
				data: { chain_id: replay[0]?.chain?.id ?? '', transactions: replay },
				meta: {
					idempotent_replay: true,
					transactions: { limit: replay.length, total: replay.length, next_cursor: null, prev_cursor: null },
				},
			};
		}

		if (payload.data.transactions.length > TRANSACTION_CHAIN_LIMIT) {
			throw new ApiError('chain_too_long', `A chain carries at most ${String(TRANSACTION_CHAIN_LIMIT)} entries`);
		}

		await delay();

		const chainId = uuidv4();
		const createdAt = new Date().toISOString();
		const ordered = this.orderChainEntries(payload.data.transactions);
		const created = ordered.map((entry) => this.build(entry, chainId, ordered.length, createdAt));

		created.forEach((transaction) => { this.storage.add(transaction); });

		const dtos = created.map((transaction) => this.toDto(transaction));
		this.chainKeys.remember(payload.idempotencyKey, payload.data, dtos);

		return {
			data: { chain_id: chainId, transactions: dtos },
			meta: {
				idempotent_replay: false,
				transactions: { limit: dtos.length, total: dtos.length, next_cursor: null, prev_cursor: null },
			},
		};
	}

	public async deleteChain(payload: TransactionChainDeleteRequest): Promise<TransactionChainDeleteResponse> {
		await delay();

		const members = this.storage.list().filter((item) => item.chain_id === payload.chainId);
		if (members.length === 0) throw new ApiError('not_found', `Chain ${payload.chainId} does not exist`);

		const cancelledAt = new Date().toISOString();
		const cancelled = members.map((member) => ({
			...member,
			deleted_at: member.deleted_at ?? cancelledAt,
		}));

		members.forEach((member) => { this.storage.remove(member); });
		cancelled.forEach((member) => { this.storage.add(member); });

		const dtos = orderTransactions(cancelled).map((member) => this.toDto(member));

		return {
			data: { chain_id: payload.chainId, transactions: dtos },
			meta: {
				transactions: { limit: dtos.length, total: dtos.length, next_cursor: null, prev_cursor: null },
				cached: false,
			},
		};
	}

	public async listCategories(_payload: TransactionCategoriesRequest): Promise<TransactionCategoriesResponse> {
		await delay();

		const stored = this.storage.list()
			.map((item) => item.category)
			.filter((category): category is string => category !== null);
		const labels = [...new Set([...SEED_CATEGORIES, ...stored])];
		const data: CategoryDto[] = labels.map((label) => ({ id: toCategoryId(label), label }));

		return { data };
	}

	public async scanReceipt(_payload: TransactionScanRequest): Promise<TransactionScanResponse> {
		await delay();

		return { data: SEED_SCAN };
	}
}

export { TransactionsMockRESTApiClient, SEARCH_FIELDS as TRANSACTION_SEARCH_FIELDS };
