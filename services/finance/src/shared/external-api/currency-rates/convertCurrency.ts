import axios from "axios";

import { CONVERT_CURRENCY_API_URL } from "./config.ts";


interface ConvertCurrencyResponse {
	success: boolean
	info: {
		rate: number
	}
}

interface ExchangeRate {
	from: string
	to: string
	rate: number
}

async function convertCurrency(
	from: string,
	to: string
): Promise<ExchangeRate> {
	const searchParams = new URLSearchParams({
		from,
		to
	});
	const params = searchParams.toString();
	const url = `${CONVERT_CURRENCY_API_URL}?${params}`;

	return await axios.get<ConvertCurrencyResponse>(url)
		.then((response) => {
			if (!response.data.success) throw new Error('Failed to fetch currencies');

			return response.data.info;
		})
		.then((info) => ({ from, to, rate: info.rate }));
}

export { convertCurrency };
export type { ExchangeRate };