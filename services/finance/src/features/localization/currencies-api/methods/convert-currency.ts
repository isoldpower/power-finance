import { toAmountString } from "@shared/api";
import { conversionFromApi } from "../mutators";
import type { MoneyConversion } from "@entity/localization";
import type { ICurrenciesRESTApiClient } from "../rest-client";

interface ConvertCurrencyRequest {
	handler: Pick<ICurrenciesRESTApiClient, 'convert'>;
	from: string;
	to: string;
	amount: number;
}

type ConvertCurrencyResponse = MoneyConversion;

async function convertCurrency(request: ConvertCurrencyRequest): Promise<ConvertCurrencyResponse> {
	const response = await request.handler.convert({
		params: {
			from_code: request.from,
			to_code: request.to,
			amount: toAmountString(request.amount),
		},
	});

	return conversionFromApi(response.data, response.meta.fetched_at);
}

export { convertCurrency };
export type { ConvertCurrencyRequest, ConvertCurrencyResponse };
