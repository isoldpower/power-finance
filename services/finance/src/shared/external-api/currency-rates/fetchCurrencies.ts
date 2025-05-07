import axios from "axios";

import { CURRENCY_API_URL } from "./config.ts";
import { z } from "zod";


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

	return await axios.get<FetchCurrenciesResponse>(url, { timeout: 3000 })
		.then((response) => {
			if (!response.data.success) throw new Error('Unsuccessful response from the server');

			return response.data.rates;
		})
		.then((rates) => {
			return Object.entries(rates).map(([key, value]) => ({
				from,
				to: key,
				rate: value
			}));
		})
		.catch((error: unknown) => {
			const { message } = z.object({
				message: z.string()
			}).catch({
				message: 'Unknown error when fetching currencies'
			}).parse(error);

			throw new Error(`Failed to fetch currencies: ${message}`)
		});
}

export { fetchCurrencies };
export type { ExchangeRate };