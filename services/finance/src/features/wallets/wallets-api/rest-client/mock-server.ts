import {v4 as uuidv4} from "uuid";

import type {Wallet, WalletGoalMeta} from "@entity/wallets";
import {DEFAULT_GOAL_COLOR, DEFAULT_GOAL_ICON, DEFAULT_WALLET_GRADIENT} from "@entity/wallets";
import type {WalletSearchLeaf, WalletSearchNode, WalletSearchRoot, WalletStats} from "../types.ts";
import type {IStorage} from "@internal/shared";
import {LocalStorageMock} from "@internal/shared";

import {flatToWalletDetailed, flatToWalletPreview} from "../mutators/flat-to-api.ts";
import {
	IWalletsRESTApiClient,
	WalletDeleteRequest,
	WalletDeleteResponse,
	WalletGetRequest,
	WalletGetResponse,
	WalletListRequest,
	WalletListResponse,
	WalletPatchRequest,
	WalletPatchResponse,
	WalletPostRequest,
	WalletPostResponse,
	WalletPutRequest,
	WalletPutResponse, WalletsSearchRequest, WalletsSearchResponse
} from "./types.ts";


interface StoredTransaction {
	id: string;
	source_wallet_id: string;
	amount: string;
	created_at?: string;
}

// Goals stored before amounts became numeric kept them as "$1,234" strings.
interface LegacyGoalAmounts {
	target?: string;
	monthly?: string;
}

const parseLegacyAmount = (value: string | undefined): number => {
	return Number((value ?? '').replace(/[^0-9.]/g, '')) || 0;
};

function resolveField(wallet: Wallet, path: string): unknown {
	return path.split(".").reduce<unknown>(
		(node, key) => (node && typeof node === "object") ? (node as Record<string, unknown>)[key] : undefined,
		wallet,
	);
}

function matchesLeaf(wallet: Wallet, leaf: WalletSearchLeaf): boolean {
	const field = resolveField(wallet, leaf.field_name);
	if (field === undefined || field === null) return false;

	const fieldString = String(field);
	const fieldNumber = typeof field === "number" ? field : parseFloat(fieldString);
	const valueNumber = parseFloat(leaf.value);
	const bothNumeric = !Number.isNaN(fieldNumber) && !Number.isNaN(valueNumber);

	switch (leaf.operator) {
		case "exact":
		case "eq":
			return bothNumeric ? fieldNumber === valueNumber : fieldString === leaf.value;
		case "iexact":
			return fieldString.toLowerCase() === leaf.value.toLowerCase();
		case "contains":
			return fieldString.includes(leaf.value);
		case "icontains":
			return fieldString.toLowerCase().includes(leaf.value.toLowerCase());
		case "startswith":
			return fieldString.startsWith(leaf.value);
		case "istartswith":
			return fieldString.toLowerCase().startsWith(leaf.value.toLowerCase());
		case "endswith":
			return fieldString.endsWith(leaf.value);
		case "iendswith":
			return fieldString.toLowerCase().endsWith(leaf.value.toLowerCase());
		case "gt":
			return bothNumeric && fieldNumber > valueNumber;
		case "gte":
			return bothNumeric && fieldNumber >= valueNumber;
		case "lt":
			return bothNumeric && fieldNumber < valueNumber;
		case "lte":
			return bothNumeric && fieldNumber <= valueNumber;
		default:
			return false;
	}
}

function matchesNode(wallet: Wallet, node: WalletSearchNode): boolean {
	if ("AND" in node && node.AND) return node.AND.every((child) => matchesNode(wallet, child));
	if ("OR" in node && node.OR) return node.OR.some((child) => matchesNode(wallet, child));
	return matchesLeaf(wallet, node as WalletSearchLeaf);
}

function matchesSearch(wallet: Wallet, root: WalletSearchRoot | undefined): boolean {
	if (!root) return true;
	return matchesNode(wallet, root);
}

class WalletsMockRESTApiClient implements IWalletsRESTApiClient {
	private readonly storage: IStorage<Wallet>;
	private readonly transactions: IStorage<StoredTransaction>;

	constructor(_key: string) {
		this.storage = new LocalStorageMock<Wallet>(_key);
		this.transactions = new LocalStorageMock<StoredTransaction>('transactions');
	}

	private withCompleteGoal(wallet: Wallet): Wallet {
		if (wallet.type !== 'long-term-goal') return wallet;

		const legacy = wallet.goal as (WalletGoalMeta & LegacyGoalAmounts) | undefined;

		return {
			...wallet,
			goal: {
				icon: wallet.goal?.icon ?? DEFAULT_GOAL_ICON,
				color: wallet.goal?.color ?? DEFAULT_GOAL_COLOR,
				targetAmount: wallet.goal?.targetAmount ?? parseLegacyAmount(legacy?.target),
				monthlyAmount: wallet.goal?.monthlyAmount ?? parseLegacyAmount(legacy?.monthly),
			},
		};
	}

	private withLiveBalance(wallet: Wallet): Wallet {
		const delta = this.transactions.list().reduce(
			(sum, txn) => txn.source_wallet_id === wallet.id ? sum + (parseFloat(txn.amount) || 0) : sum,
			0
		);
		return this.withCompleteGoal({
			...wallet,
			color: wallet.color || DEFAULT_WALLET_GRADIENT,
			balance: { ...wallet.balance, amount: wallet.balance.amount + delta }
		});
	}

	private statsFor(walletId: string): WalletStats {
		const owned = this.transactions.list().filter((txn) => txn.source_wallet_id === walletId);
		const lastActivity = owned.reduce<string | null>(
			(latest, txn) => txn.created_at && (!latest || txn.created_at > latest) ? txn.created_at : latest,
			null
		);

		return { transaction_count: owned.length, last_activity_at: lastActivity };
	}

	public get(
		request: WalletGetRequest
	): Promise<WalletGetResponse> {
		return new Promise((resolve) => setTimeout(resolve, 250))
			.then(() => this.storage.get(request.id))
			.then((value) => {
				if (!value) throw new Error("Not found");

				return flatToWalletDetailed(this.withLiveBalance(value), this.statsFor(value.id));
			});
	}
	
	public search(
		request: WalletsSearchRequest,
	): Promise<WalletsSearchResponse> {
		const filteredItems = this.storage.list()
			.map((value) => this.withLiveBalance(value))
			.filter((value) => matchesSearch(value, request.data));
		const start = request.params?.offset ?? 0;
		const end = request.params?.limit
			? start + request.params.limit
			: filteredItems.length;

		return new Promise((resolve) => setTimeout(resolve, 250))
			.then(() => filteredItems.slice(start, end))
			.then((values) => ({
				data: values.map((value) => flatToWalletPreview(value)),
				meta: {
					total: filteredItems.length,
					offset: request.params?.offset ?? 0,
					limit: end - start,
				}
			}));
	}

	public post(
		request: WalletPostRequest
	): Promise<WalletPostResponse> {
		const timestamp = new Date().toISOString();
		const filledPayload: Wallet = Object.assign(request.data, {
			id: uuidv4(),
			createdAt: timestamp,
			updatedAt: timestamp,
		});

		return new Promise((resolve) => setTimeout(resolve, 250))
			.then(() => { this.storage.add(filledPayload); })
			.then(() => flatToWalletDetailed(filledPayload, this.statsFor(filledPayload.id)));
	}

	public list(
		request: WalletListRequest
	): Promise<WalletListResponse> {
		const items = this.storage.list();
		const start = request.params?.offset ?? 0;
		const end = request.params?.limit
			? start + request.params.limit
			: items.length;

		return new Promise((resolve) => setTimeout(resolve, 250))
			.then(() => items.slice(start, end))
			.then((values) => ({
				data: values.map((value) => flatToWalletPreview(this.withLiveBalance(value))),
				meta: {
					total: items.length,
					offset: request.params?.offset ?? 0,
					limit: end - start,
				}
			}));
	}

	patch(
		request: WalletPatchRequest
	): Promise<WalletPatchResponse> {
		return new Promise((resolve) => setTimeout(resolve, 250))
			.then(() => this.storage.get(request.id))
			.then((value) => {
				if (!value) throw new Error("Not found");

				this.storage.remove(value);
				const openingAmount = value.balance.amount;
				const updatedValue = Object.assign(value, request.data, { updatedAt: new Date().toISOString() });
				// The stored balance is the wallet's opening amount; the live balance is derived from
				// the transaction ledger, so a client write must never overwrite it (that double-counts).
				updatedValue.balance = { ...updatedValue.balance, amount: openingAmount };
				this.storage.add(updatedValue);
				return flatToWalletDetailed(this.withLiveBalance(updatedValue), this.statsFor(updatedValue.id));
			});
	}

	put(
		request: WalletPutRequest
	): Promise<WalletPutResponse> {
		return new Promise((resolve) => setTimeout(resolve, 250))
			.then(() => this.storage.get(request.id))
			.then((value) => {
				if (!value) throw new Error("Not found");

				this.storage.remove(value);
				const updatedValue: Wallet = Object.assign(
					{ id: value.id, createdAt: value.createdAt, updatedAt: new Date().toISOString() },
					request.data
				);
				// Opening balance is server-owned (live balance derives from the ledger); keep the stored amount.
				updatedValue.balance = { ...updatedValue.balance, amount: value.balance.amount };
				this.storage.add(updatedValue);
				return flatToWalletDetailed(this.withLiveBalance(updatedValue), this.statsFor(updatedValue.id));
			});
	}

	delete(
		request: WalletDeleteRequest
	): Promise<WalletDeleteResponse> {
		return new Promise((resolve) => setTimeout(resolve, 250))
			.then(() => this.storage.get(request.id))
			.then((value) => {
				if (!value) throw new Error("Not found");

				this.storage.remove(value);
				return {
					message: `Successfully deleted resource at ${request.id}`,
					meta: {
						id: request.id,
						success: true
					}
				};
			});
	}
}

export { WalletsMockRESTApiClient };
