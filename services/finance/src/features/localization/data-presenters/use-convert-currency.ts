import { useMutation } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { convertCurrency } from "../currencies-api";
import { CURRENCY_CACHE_KEYS } from "./cache-config.ts";

import type { MoneyConversion } from "@entity/localization";


interface ConvertCurrencyInput {
	from: string;
	to: string;
	amount: number;
}

const useConvertCurrency = () => {
	const apiContext = useApiContext();

	return useMutation<MoneyConversion, Error, ConvertCurrencyInput>({
		mutationKey: [CURRENCY_CACHE_KEYS.convert],
		mutationFn: (input: ConvertCurrencyInput) => convertCurrency({
			handler: apiContext.currencyServers.rest,
			from: input.from,
			to: input.to,
			amount: input.amount,
		}),
	});
};

export { useConvertCurrency };
export type { ConvertCurrencyInput };
