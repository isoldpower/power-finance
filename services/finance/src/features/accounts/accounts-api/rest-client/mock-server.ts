import type { IStorage } from "@internal/shared";
import { LocalStorageMock } from "@internal/shared";
import type {
	AccountEntriesRequest, AccountEntriesResponse,
	AccountGetRequest, AccountGetResponse,
	AccountListRequest, AccountListResponse,
	IAccountsRESTApiClient,
} from "./types.ts";
import type { AccountPreview, AccountDetailed, LedgerEntry } from "../types.ts";
import { ACCOUNT_SEED, LEDGER_ENTRY_SEED } from "./mock-seed.ts";


class AccountsMockRESTApiClient implements IAccountsRESTApiClient {
	private readonly accounts: IStorage<AccountPreview>;
	private readonly entries: IStorage<LedgerEntry>;

	constructor() {
		this.accounts = new LocalStorageMock<AccountPreview>('accounts');
		this.entries = new LocalStorageMock<LedgerEntry>('ledger-entries');
		
		this.seed();
	}

	private seed(): void {
		if (this.accounts.list().length === 0) {
			ACCOUNT_SEED.forEach((account) => { 
				this.accounts.add(account); 
			});
		}
		if (this.entries.list().length === 0) {
			LEDGER_ENTRY_SEED.forEach((entry) => {
				this.entries.add(entry);
			});
		}
	}

	private toDetailed(account: AccountPreview): AccountDetailed {
		const timestamp = new Date().toISOString();

		return {
			...account,
			meta: { 
				id: account.id,
				created_at: timestamp,
				updated_at: timestamp,
			},
			totals: { 
				balance: account.balance,
			},
		};
	}

	public list(
		request: AccountListRequest
	): Promise<AccountListResponse> {
		const items = this.accounts.list();
		const start = request.params?.offset ?? 0;
		const end = request.params?.limit ? start + request.params.limit : items.length;

		return new Promise((resolve) => setTimeout(resolve, 250))
			.then(() => items.slice(start, end))
			.then((values) => ({
				data: values,
				meta: {
					total: items.length,
					offset: start,
					limit: end - start,
				},
			}));
	}

	public get(
		request: AccountGetRequest
	): Promise<AccountGetResponse> {
		return new Promise((resolve) => setTimeout(resolve, 250))
			.then(() => this.accounts.get(request.id))
			.then((value) => {
				if (!value) {
					throw new Error("Not found");
				}

				return this.toDetailed(value);
			});
	}

	public listEntries(
		request: AccountEntriesRequest
	): Promise<AccountEntriesResponse> {
		const items = this.entries.list();
		const start = request.params?.offset ?? 0;
		const end = request.params?.limit 
			? start + request.params.limit 
			: items.length;

		return new Promise((resolve) => setTimeout(resolve, 250))
			.then(() => items.slice(start, end))
			.then((values) => ({
				data: values,
				meta: {
					total: items.length,
					offset: start, 
					limit: end - start,
				},
			}));
	}
}

export { AccountsMockRESTApiClient };
