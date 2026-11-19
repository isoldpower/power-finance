import { roundAmount } from "../../api/serialization/index.ts";

import { currencyFractionDigits } from "./fraction-digits.ts";


interface DisplayAmount {
	value: number;
	fractionDigits: number;
}

function toDisplayAmount(amount: string, currency: string): DisplayAmount {
	const fractionDigits = currencyFractionDigits(currency);

	return {
		value: Number(roundAmount(amount, fractionDigits)),
		fractionDigits,
	};
}

export { toDisplayAmount };
export type { DisplayAmount };
