import axios from "axios";

import { CURRENCY_API_URL } from "./config.ts";


interface FetchCurrenciesResponse {
	success: boolean
	base: string
	rates: Record<string, number>
}

interface ExchangeRate {
	from: string
	to: string
	rate: number
}

async function fetchCurrencies(
	from: string
): Promise<ExchangeRate[]> {
	const searchParams = new URLSearchParams({
		base: from,
	});
	const params = searchParams.toString();
	const url = `${CURRENCY_API_URL}?${params}`;

	return await axios.get<FetchCurrenciesResponse>(url)
		.then((response) => {
			if (!response.data.success) throw new Error('Failed to fetch currencies');

			return response.data.rates;
		})
		.then((rates) => {
			return Object.entries(rates).map(([key, value]) => ({
				from,
				to: key,
				rate: value
			}));
		});
}

export { fetchCurrencies };
export type { ExchangeRate };