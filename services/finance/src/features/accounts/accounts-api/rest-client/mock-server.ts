import { ApiError, delay, paginate, parseAmount, stringifySortedQuery } from "@shared/api";
import { ACCOUNT_SEED, LEDGER_ENTRY_SEED } from "./mock-seed.ts";
import type {
	AccountGetRequest, AccountGetResponse,
	AccountListRequest, AccountListResponse,
	IAccountsRESTApiClient,
} from "./types.ts";
import type { AccountDto, AccountGroupCountsDto } from "../types.ts";

const countGroups = (accounts: AccountDto[]): AccountGroupCountsDto => ({
	assets: accounts.filter((account) => account.group === 'assets').length,
	liabilities: accounts.filter((account) => account.group === 'liabilities').length,
	equity: accounts.filter((account) => account.group === 'equity').length,
});

class AccountsMockRESTApiClient implements IAccountsRESTApiClient {
	private readonly accounts: AccountDto[] = ACCOUNT_SEED;

	public async list(payload: AccountListRequest): Promise<AccountListResponse> {
		await delay();

		const group = payload.params?.group ?? 'all';
		const lowbar = payload.params?.lowbar ?? '0';
		const currency = payload.params?.currency ?? 'USD';
		const threshold = parseAmount(lowbar);
		const matching = this.accounts
			.filter((account) => group === 'all' || account.group === group)
			.filter((account) => Math.abs(parseAmount(account.money.amount)) >= threshold);
		const page = paginate(matching, payload.params, stringifySortedQuery({ group, lowbar, currency }));

		return {
			data: page.items,
			meta: {
				...page.meta,
				cached: false,
				lowbar,
				currency,
				group,
				groups: countGroups(this.accounts),
			},
		};
	}

	public async get(payload: AccountGetRequest): Promise<AccountGetResponse> {
		await delay();

		const account = this.accounts.find((item) => item.id === payload.id);
		if (!account) throw new ApiError('not_found', `Account ${payload.id} does not exist`);

		const history = paginate(LEDGER_ENTRY_SEED, payload.params, stringifySortedQuery({ id: payload.id }));

		return {
			data: { ...account, history: history.items },
			meta: { history: history.meta, cached: false },
		};
	}
}

export { AccountsMockRESTApiClient };
