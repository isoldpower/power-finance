import type { AxiosInstance } from "axios";
import type {
	AccountEntriesRequest, AccountEntriesResponse,
	AccountGetRequest, AccountGetResponse,
	AccountListRequest, AccountListResponse,
	IAccountsRESTApiClient,
} from "./types.ts";
import type { AccountMoney, AccountPreview, AccountDetailed, LedgerEntry } from "../types.ts";


const parseMoney = (money: AccountMoney): AccountMoney => ({
	...money,
	amount: parseFloat(money.amount as unknown as string),
});

const parseAccountPreview = (account: AccountPreview): AccountPreview => ({
	...account,
	balance: parseMoney(account.balance),
});

const parseAccountDetailed = (account: AccountDetailed): AccountDetailed => ({
	...account,
	balance: parseMoney(account.balance),
	totals: { balance: parseMoney(account.totals.balance) },
});

const parseLedgerEntry = (entry: LedgerEntry): LedgerEntry => ({
	...entry,
	amount: parseMoney(entry.amount),
});


class AccountsDjangoRESTApiClient implements IAccountsRESTApiClient {
	private readonly axiosInstance: AxiosInstance;

	constructor(axiosInstance: AxiosInstance) {
		this.axiosInstance = axiosInstance;
	}

	private resolvePostfix(params: object | undefined): string {
		let requestPostfix = '';
		if (params && Object.entries(params).length > 0) {
			const urlParams = new URLSearchParams(Object.entries(params));
			requestPostfix = `?${urlParams.toString()}`;
		}

		return requestPostfix;
	}

	public list(
		request: AccountListRequest
	): Promise<AccountListResponse> {
		const postfix = this.resolvePostfix(request.params);

		return this.axiosInstance.get<AccountListResponse>(`/${postfix}`)
			.then((response) => ({
				...response.data,
				data: response.data.data.map(parseAccountPreview),
			}));
	}

	public get(
		request: AccountGetRequest
	): Promise<AccountGetResponse> {
		const postfix = this.resolvePostfix(request.params);

		return this.axiosInstance.get<AccountGetResponse>(`/${request.id}/${postfix}`)
			.then((response) => parseAccountDetailed(response.data));
	}

	public listEntries(
		request: AccountEntriesRequest
	): Promise<AccountEntriesResponse> {
		const postfix = this.resolvePostfix(request.params);

		return this.axiosInstance.get<AccountEntriesResponse>(`/${request.id}/entries/${postfix}`)
			.then((response) => ({
				...response.data,
				data: response.data.data.map(parseLedgerEntry),
			}));
	}
}

export { AccountsDjangoRESTApiClient };
