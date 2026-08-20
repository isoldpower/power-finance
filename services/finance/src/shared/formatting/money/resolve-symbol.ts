import { CURRENCY_SYMBOLS } from "./config.ts";


function currencySymbol(currency: string): string {
	return CURRENCY_SYMBOLS[currency] ?? currency;
}

export { currencySymbol };