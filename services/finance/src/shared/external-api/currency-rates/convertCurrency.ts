import axios from "axios";

import { CONVERT_CURRENCY_API_URL } from "./config.ts";
import {z} from "zod";


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

	return await axios.get<ConvertCurrencyResponse>(url, { timeout: 3000 })
		.then((response) => {
			if (!response.data.success) throw new Error('Failed to fetch currencies');

			return response.data.info;
		})
		.then((info) => ({ from, to, rate: info.rate }))
		.catch((error: unknown) => {
			const { message } = z.object({
				message: z.string()
			}).catch({
				message: `Unknown error when converting currency ${from} to ${to}`
			}).parse(error);

			throw new Error(`Failed to convert currencies: ${message}`)
		});
}

export { convertCurrency };
export type { ExchangeRate };