import type { ITransactionsRESTApiClient } from "./types.ts";
import type { Wallet } from "@entity/wallets";
import { IStorage, LocalStorageMock } from "@internal/shared";
import type {
	TransactionChainRequest, TransactionChainResponse,
	TransactionDeleteRequest, TransactionDeleteResponse,
	TransactionGetRequest, TransactionGetResponse,
	TransactionListRequest, TransactionListResponse,
	TransactionPatchRequest, TransactionPatchResponse,
	TransactionPostRequest, TransactionPostResponse,
	TransactionCategoriesRequest,
	TransactionCategoriesResponse,
	TransactionScanRequest,
	TransactionScanResponse,
} from "./types.ts";
import type { TransactionDetailed, TransactionEntry, TransactionPreview, TransactionPreviewWallet, ReceiptScanDto } from "../types.ts";
import type { WalletPreview } from "@feature/wallets/wallets-api/types.ts";
import { v4 as uuidv4 } from "uuid";
import { StorageTransaction, buildEntries, createTransactionFromMinimalPayload, directionFromAmount, orderChain } from "./utils.ts";


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

const toCategoryId = (label: string): string => label.toLowerCase().replace(/\s+/g, '-');

class TransactionMockRESTApiClient implements ITransactionsRESTApiClient {
	private readonly storage: IStorage<StorageTransaction>;
	private readonly wallets: IStorage<Wallet>;

	constructor(_key: string) {
		this.storage = new LocalStorageMock<StorageTransaction>(_key);
		this.wallets = new LocalStorageMock<Wallet>('wallets');
	}

	private walletRef(walletId: string): TransactionPreviewWallet {
		const wallet = this.wallets.get(walletId);

		return {
			id: walletId,
			name: wallet?.name ?? 'Unknown wallet',
			color: wallet?.color ?? '',
		};
	}

	private walletPreview(walletId: string): WalletPreview {
		const wallet = this.wallets.get(walletId);

		return {
			id: walletId,
			name: wallet?.name ?? 'Unknown wallet',
			color: wallet?.color ?? '',
			balance: wallet?.balance ?? { amount: 0, currency: '' },
			credit: wallet?.credit ?? false,
			type: wallet?.type,
			goal: wallet?.goal,
		};
	}

	private entries(value: StorageTransaction): TransactionEntry[] {
		return buildEntries(
			value.direction,
			value.amount,
			this.walletRef(value.source_wallet_id).name,
			value.category
		);
	}

	private toPreview(value: StorageTransaction): TransactionPreview {
		return {
			id: value.id,
			amount: value.amount,
			currency_code: value.currency_code,
			direction: value.direction ?? directionFromAmount(value.amount),
			merchant: value.merchant ?? '',
			category: value.category ?? 'Uncategorized',
			occurred_at: value.occurred_at ?? value.created_at,
			created_at: value.created_at,
			origin: value.origin ?? 'imported',
			scanned: Boolean(value.receipt),
			entries: this.entries(value),
			wallet: this.walletRef(value.source_wallet_id),
		};
	}

	private toDetailed(value: StorageTransaction): TransactionDetailed {
		return {
			id: value.id,
			amount: value.amount,
			currency_code: value.currency_code,
			direction: value.direction ?? directionFromAmount(value.amount),
			merchant: value.merchant ?? '',
			category: value.category ?? 'Uncategorized',
			occurred_at: value.occurred_at ?? value.created_at,
			origin: value.origin ?? 'imported',
			entries: this.entries(value),
			note: value.note ?? '',
			receipt: value.receipt,
			wallet: this.walletPreview(value.source_wallet_id),
			chain_id: value.chain_id,
			meta: {
				id: value.id,
				created_at: value.created_at,
				updated_at: value.created_at,
			},
		};
	}

	public get(
		request: TransactionGetRequest
	): Promise<TransactionGetResponse> {
		return new Promise((resolve) => setTimeout(resolve, 250))
			.then(() => this.storage.get(request.id))
			.then((value) => {
				if (!value) throw new Error("Not found");

				return this.toDetailed(value);
			});
	}

	public post(
		request: TransactionPostRequest
	): Promise<TransactionPostResponse> {
		const stored = createTransactionFromMinimalPayload(request.data);
		stored.currency_code = this.wallets.get(stored.source_wallet_id)?.balance.currency ?? 'USD';

		return new Promise((resolve) => setTimeout(resolve, 250))
			.then(() => { this.storage.add(stored); })
			.then(() => this.toDetailed(stored));
	}

	public chain(
		request: TransactionChainRequest
	): Promise<TransactionChainResponse> {
		const chainId = uuidv4();
		const legs = orderChain(request.data.transactions).map((item) => {
			const stored = createTransactionFromMinimalPayload(item);
			stored.chain_id = chainId;
			stored.currency_code = this.wallets.get(item.source_wallet_id)?.balance.currency ?? 'USD';
			return stored;
		});

		return new Promise((resolve) => setTimeout(resolve, 250))
			.then(() => { legs.forEach((leg) => { this.storage.add(leg); }); })
			.then(() => ({
				chain_id: chainId,
				transactions: legs.map((leg) => this.toDetailed(leg)),
			}));
	}

	public list(
		request: TransactionListRequest
	): Promise<TransactionListResponse> {
		const walletId = request.params?.wallet_id;
		const items = walletId
			? this.storage.list().filter((value) => value.source_wallet_id === walletId)
			: this.storage.list();
		const start = request.params?.offset ?? 0;
		const end = request.params?.limit
			? start + request.params.limit
			: items.length;

		return new Promise((resolve) => setTimeout(resolve, 250))
			.then(() => items.slice(start, end))
			.then((values) => ({
				data: values.map((value) => this.toPreview(value)),
				meta: {
					total: items.length,
					offset: start,
					limit: end - start,
				}
			}));
	}

	patch(
		request: TransactionPatchRequest
	): Promise<TransactionPatchResponse> {
		return new Promise((resolve) => setTimeout(resolve, 250))
			.then(() => this.storage.get(request.id))
			.then((value) => {
				if (!value) throw new Error("Not found");

				this.storage.remove(value);
				const updated = Object.assign(value, request.data);
				this.storage.add(updated);
				return this.toDetailed(updated);
			});
	}

	delete(
		request: TransactionDeleteRequest
	): Promise<TransactionDeleteResponse> {
		return new Promise((resolve) => setTimeout(resolve, 250))
			.then(() => this.storage.get(request.id))
			.then((value) => {
				if (!value) throw new Error("Not found");

				this.storage.remove(value);
				return {
					message: `Successfully deleted resource at ${request.id}`,
					meta: {
						id: request.id,
						success: true,
					}
				};
			});
	}

	listCategories(
		_request: TransactionCategoriesRequest
	): Promise<TransactionCategoriesResponse> {
		return new Promise<TransactionCategoriesResponse>((resolve) => {
			const stored = this.storage.list()
				.map((transaction) => transaction.category)
				.filter((category): category is string => Boolean(category));
			const labels = [...new Set([...SEED_CATEGORIES, ...stored])];

			setTimeout(() => {
				resolve({ data: labels.map((label) => ({ id: toCategoryId(label), label })) });
			}, 250);
		});
	}

	scanReceipt(
		_request: TransactionScanRequest
	): Promise<TransactionScanResponse> {
		return new Promise<TransactionScanResponse>((resolve) => {
			setTimeout(() => { resolve(SEED_SCAN); }, 250);
		});
	}
}

export { TransactionMockRESTApiClient };
