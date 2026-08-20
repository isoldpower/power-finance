import { pageFromMeta, toAmountString } from "@shared/api";
import { accountFromApi, groupCountsFromApi, moneyFromApi } from "../mutators";

import type { Page, PageParams } from "@shared/api";
import type { Account, AccountGroupCounts, AccountGroupFilter } from "@entity/accounts";
import type { Money } from "@entity/localization";
import type { IAccountsRESTApiClient } from "../rest-client";


interface ListAccountsRequest {
	handler: Pick<IAccountsRESTApiClient, 'list'>;
	group?: AccountGroupFilter;
	lowbar?: Money;
	page?: PageParams;
}

interface ListAccountsResponse {
	page: Page<Account>;
	group: AccountGroupFilter;
	groups: AccountGroupCounts;
	lowbar: Money;
}

async function listAccounts(request: ListAccountsRequest): Promise<ListAccountsResponse> {
	const response = await request.handler.list({
		params: {
			...request.page,
			group: request.group,
			lowbar: request.lowbar ? toAmountString(request.lowbar.amount) : undefined,
			currency: request.lowbar?.currency,
		},
	});

	return {
		page: pageFromMeta(response.data.map(accountFromApi), response.meta),
		group: response.meta.group,
		groups: groupCountsFromApi(response.meta.groups),
		lowbar: moneyFromApi({ amount: response.meta.lowbar, currency: response.meta.currency }),
	};
}

export { listAccounts };
export type { ListAccountsRequest, ListAccountsResponse };
