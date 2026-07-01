import type { AxiosInstance } from "axios";

import type {
	ISummaryRESTApiClient,
	InsightsGetRequest,
	InsightsGetResponse,
	LedgerBalanceGetRequest,
	LedgerBalanceGetResponse,
	Money,
} from "../types.ts";

const parseMoney = (money: Money): Money => ({
	...money,
	amount: parseFloat(money.amount as unknown as string),
});


class SummaryDjangoRESTApiClient implements ISummaryRESTApiClient {
	private readonly axiosInstance: AxiosInstance;

	constructor(axiosInstance: AxiosInstance) {
		this.axiosInstance = axiosInstance;
	}

	public getInsights(request: InsightsGetRequest): Promise<InsightsGetResponse> {
		const params = new URLSearchParams({ metrics: request.params.metrics.join(',') });
		if (request.params.range) params.set('range', request.params.range);

		return this.axiosInstance.get<InsightsGetResponse>(`/insights/?${params.toString()}`)
			.then((response) => {
				const data = response.data;
				return {
					net_worth: data.net_worth ? { ...data.net_worth, value: parseMoney(data.net_worth.value) } : undefined,
					cash_flow: data.cash_flow
						? { ...data.cash_flow, in: parseMoney(data.cash_flow.in), out: parseMoney(data.cash_flow.out), net: parseMoney(data.cash_flow.net) }
						: undefined,
				};
			});
	}

	public getLedgerBalance(_request: LedgerBalanceGetRequest): Promise<LedgerBalanceGetResponse> {
		return this.axiosInstance.get<LedgerBalanceGetResponse>(`/ledger-balance/`)
			.then((response) => ({
				...response.data,
				assets: parseMoney(response.data.assets),
				liabilities: parseMoney(response.data.liabilities),
				equity: parseMoney(response.data.equity),
			}));
	}
}

export { SummaryDjangoRESTApiClient };
