import { roundAmount } from "../../api/serialization/index.ts";

import { currencyFractionDigits } from "./fraction-digits.ts";


function roundToCurrency(amount: string, currency: string): string {
	return roundAmount(amount, currencyFractionDigits(currency));
}

export { roundToCurrency };
