import { roundAmount } from "@shared/api";

import { currencyFractionDigits } from "./fraction-digits.ts";


function roundToCurrency(amount: string, currency: string): string {
	return roundAmount(amount, currencyFractionDigits(currency));
}

export { roundToCurrency };
