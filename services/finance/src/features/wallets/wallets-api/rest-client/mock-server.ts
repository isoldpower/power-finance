import { v4 as uuidv4 } from "uuid";

import { LocalStorageMock } from "@internal/shared";
import {
	ApiError,
	createMatcher,
	delay,
	IdempotencyStore,
	paginate,
	parseAmount,
	serializeAmount,
	stringifySortedQuery,
	validateFilter,
} from "@shared/api";
import { storedTransactionToDto, TRANSACTIONS_STORAGE_KEY, walletDelta } from "@feature/transactions/transactions-api";
import { WALLETS_STORAGE_KEY } from "./storage.ts";
import type { IStorage } from "@internal/shared";
import type { FieldPolicy, MoneyDto } from "@shared/api";
import type { StoredTransaction, TransactionDto } from "@feature/transactions/transactions-api";
import type { StoredWallet } from "./storage.ts";
import type { WalletDetailDto, WalletDto, WalletSearchField } from "../types.ts";
import type {
	IWalletsRESTApiClient,
	WalletDeleteRequest, WalletDeleteResponse,
	WalletGetRequest, WalletGetResponse,
	WalletListRequest, WalletListResponse,
	WalletPatchRequest, WalletPatchResponse,
	WalletPostRequest, WalletPostResponse,
	WalletSearchRequest, WalletSearchResponse,
} from "./types.ts";

const MONTH_IN_MS = 30 * 24 * 60 * 60 * 1000;

const SEARCH_FIELDS: FieldPolicy<WalletSearchField> = {
	name: ['eq', 'neq', 'in', 'contains', 'icontains'],
	currency: ['eq', 'neq', 'in'],
	balance: ['eq', 'gt', 'gte', 'lt', 'lte'],
	created_at: ['gt', 'gte', 'lt', 'lte'],
};

interface WalletRecord {
	wallet: StoredWallet;
	balance: string;
}

const compareDesc = (left: string, right: string): number => (left < right ? 1 : left > right ? -1 : 0);

const orderWallets = (records: WalletRecord[]): WalletRecord[] => {
	return [...records].sort((left, right) => {
		if (left.wallet.favorite !== right.wallet.favorite) return left.wallet.favorite ? -1 : 1;

		const byDate = compareDesc(left.wallet.created_at, right.wallet.created_at);

		return byDate !== 0 ? byDate : compareDesc(left.wallet.id, right.wallet.id);
	});
};

const leafValue = (record: WalletRecord, field: WalletSearchField): string | null => {
	switch (field) {
		case 'name':
			return record.wallet.name;
		case 'currency':
			return record.wallet.currency;
		case 'balance':
			return record.balance;
		case 'created_at':
			return record.wallet.created_at;
	}
};

const matchesNode = createMatcher<WalletRecord, WalletSearchField>(
	SEARCH_FIELDS,
	(record, field) => leafValue(record, field),
	{ numericFields: ['balance'] },
);

class WalletsMockRESTApiClient implements IWalletsRESTApiClient {
	private readonly storage: IStorage<StoredWallet>;
	private readonly transactions: IStorage<StoredTransaction>;
	private readonly idempotency = new IdempotencyStore<WalletDto>();

	constructor(storageKey: string = WALLETS_STORAGE_KEY) {
		this.storage = new LocalStorageMock<StoredWallet>(storageKey);
		this.transactions = new LocalStorageMock<StoredTransaction>(TRANSACTIONS_STORAGE_KEY);
	}

	private ledger(walletId: string): StoredTransaction[] {
		return this.transactions.list()
			.filter((item) => item.wallet_id === walletId && item.deleted_at === null);
	}

	private balance(wallet: StoredWallet): string {
		const delta = this.ledger(wallet.id).reduce((sum, item) => sum + walletDelta(item), 0);

		return serializeAmount(parseAmount(wallet.opening_balance) + delta);
	}

	private record(wallet: StoredWallet): WalletRecord {
		return { wallet, balance: this.balance(wallet) };
	}

	private money(record: WalletRecord): MoneyDto {
		return { amount: record.balance, currency: record.wallet.currency };
	}

	private toDto(record: WalletRecord): WalletDto {
		const { wallet } = record;

		return {
			id: wallet.id,
			name: wallet.name,
			created_at: wallet.created_at,
			updated_at: wallet.updated_at,
			deleted_at: wallet.deleted_at,
			category: wallet.category,
			currency: wallet.currency,
			money: this.money(record),
			zero_balance: { amount: wallet.zero_balance, currency: wallet.currency },
			favorite: wallet.favorite,
			color: wallet.color,
		};
	}

	private lastMonth(walletId: string, currency: string): WalletDetailDto['last_month'] {
		const since = Date.now() - MONTH_IN_MS;
		const recent = this.ledger(walletId).filter((item) => new Date(item.created_at).getTime() >= since);
		const sum = (type: StoredTransaction['type']): string => serializeAmount(
			recent
				.filter((item) => item.type === type)
				.reduce((total, item) => total + parseAmount(item.amount), 0),
		);

		return {
			inflow: { amount: sum('income'), currency },
			outflow: { amount: sum('expense'), currency },
		};
	}

	private recent(walletId: string): TransactionDto[] {
		return this.ledger(walletId)
			.sort((left, right) => compareDesc(left.created_at, right.created_at))
			.map(storedTransactionToDto);
	}

	private require(id: string): StoredWallet {
		const wallet = this.storage.get(id);
		if (!wallet) throw new ApiError('not_found', `Wallet ${id} does not exist`);

		return wallet;
	}

	private open(): WalletRecord[] {
		return orderWallets(
			this.storage.list()
				.filter((wallet) => wallet.deleted_at === null)
				.map((wallet) => this.record(wallet)),
		);
	}

	private replace(previous: StoredWallet, next: StoredWallet): void {
		this.storage.remove(previous);
		this.storage.add(next);
	}

	public async list(payload: WalletListRequest): Promise<WalletListResponse> {
		await delay();

		const page = paginate(this.open(), payload.params, stringifySortedQuery({ scope: 'list' }));

		return {
			data: page.items.map((record) => this.toDto(record)),
			meta: { ...page.meta, cached: false },
		};
	}

	public async get(payload: WalletGetRequest): Promise<WalletGetResponse> {
		await delay();

		const wallet = this.require(payload.id);
		const record = this.record(wallet);
		const recent = paginate(
			this.recent(wallet.id),
			payload.params,
			stringifySortedQuery({ id: payload.id }),
		);

		return {
			data: {
				...this.toDto(record),
				last_month: this.lastMonth(wallet.id, wallet.currency),
				recent: recent.items,
			},
			meta: { recent: recent.meta, cached: false },
		};
	}

	public async post(payload: WalletPostRequest): Promise<WalletPostResponse> {
		const replay = this.idempotency.replay(payload.idempotencyKey, payload.data);
		if (replay) return { data: replay, meta: { idempotent_replay: true } };

		await delay();

		const wallet: StoredWallet = {
			id: uuidv4(),
			name: payload.data.name,
			created_at: new Date().toISOString(),
			updated_at: null,
			deleted_at: null,
			category: payload.data.category,
			currency: payload.data.currency,
			opening_balance: payload.data.opening_balance,
			zero_balance: payload.data.zero_balance,
			favorite: false,
			color: payload.data.color,
		};

		this.storage.add(wallet);

		const dto = this.toDto(this.record(wallet));
		this.idempotency.remember(payload.idempotencyKey, payload.data, dto);

		return { data: dto, meta: { idempotent_replay: false } };
	}

	public async patch(payload: WalletPatchRequest): Promise<WalletPatchResponse> {
		await delay();

		const wallet = this.require(payload.id);
		const updated: StoredWallet = {
			...wallet,
			name: payload.data.name ?? wallet.name,
			favorite: payload.data.favorite ?? wallet.favorite,
			category: payload.data.category ?? wallet.category,
			zero_balance: payload.data.zero_balance ?? wallet.zero_balance,
			color: payload.data.color ?? wallet.color,
			updated_at: new Date().toISOString(),
		};

		this.replace(wallet, updated);

		return { data: this.toDto(this.record(updated)), meta: {} };
	}

	public async delete(payload: WalletDeleteRequest): Promise<WalletDeleteResponse> {
		await delay();

		const wallet = this.require(payload.id);
		const record = this.record(wallet);

		if (wallet.deleted_at === null && parseAmount(record.balance) !== 0) {
			throw new ApiError('wallet_not_empty', 'Wallet still holds money and cannot be closed');
		}

		const closed: StoredWallet = { ...wallet, deleted_at: wallet.deleted_at ?? new Date().toISOString() };
		this.replace(wallet, closed);

		return { data: this.toDto(this.record(closed)), meta: {} };
	}

	public async search(payload: WalletSearchRequest): Promise<WalletSearchResponse> {
		validateFilter(SEARCH_FIELDS, payload.data.filter_body);

		await delay();

		const matching = this.open().filter((record) => matchesNode(record, payload.data.filter_body));
		const ordered = payload.params?.order === 'ASC' ? [...matching].reverse() : matching;
		const page = paginate(
			ordered,
			payload.params,
			stringifySortedQuery({ filter: payload.data.filter_body, order: payload.params?.order ?? 'DESC' }),
		);

		return {
			data: page.items.map((record) => this.toDto(record)),
			meta: { ...page.meta, cached: false },
		};
	}
}

export { WalletsMockRESTApiClient, SEARCH_FIELDS as WALLET_SEARCH_FIELDS };
