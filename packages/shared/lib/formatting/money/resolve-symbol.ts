import { FALLBACK_SYMBOLS } from "./config.ts";


const SYMBOL_REGISTRY = new Map<string, string>();

function currencySymbol(currency: string): string {
	const registered = SYMBOL_REGISTRY.get(currency);

	if (registered !== undefined) {
		return registered === '' ? currency : registered;
	}

	return FALLBACK_SYMBOLS[currency] ?? currency;
}

function rememberCurrencySymbol(currency: string, symbol: string): void {
	SYMBOL_REGISTRY.set(currency, symbol);
}

export { currencySymbol, rememberCurrencySymbol };
