import { rememberCurrencySymbol, rememberFractionDigits } from "../../formatting/index.ts";

import type { CurrencyMeta } from "../types.ts";


const rememberCurrencyCatalog = (currencies: readonly CurrencyMeta[]): void => {
	for (const currency of currencies) {
		rememberFractionDigits(currency.code, currency.decimals);
		rememberCurrencySymbol(currency.code, currency.symbol);
	}
};

export { rememberCurrencyCatalog };
