import type { ITransactionsRESTApiClient } from "@feature/transactions";
import type { Wallet } from "@entity/wallets";
import { IStorage, LocalStorageMock } from "@internal/shared";
import type {
	TransactionChainRequest, TransactionChainResponse,
	TransactionDeleteRequest, TransactionDeleteResponse,
	TransactionGetRequest, TransactionGetResponse,
	TransactionListRequest, TransactionListResponse,
	TransactionPatchRequest, TransactionPatchResponse,
	TransactionPostRequest, TransactionPostResponse,
} from "./types.ts";
import type { TransactionDetailed, TransactionPreview, TransactionPreviewWallet } from "../types.ts";
import type { WalletPreview } from "@feature/wallets/wallets-api/types.ts";
import { v4 as uuidv4 } from "uuid";
import { StorageTransaction, createTransactionFromMinimalPayload, directionFromAmount, orderChain } from "./utils.ts";


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
		stored.currency_code = this.wallets.get(stored.source_wallet_id)?.balance.currency ?? '';

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
			stored.currency_code = this.wallets.get(item.source_wallet_id)?.balance.currency ?? '';
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
}

export { TransactionMockRESTApiClient };
