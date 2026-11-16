import { parseAmount } from "@internal/shared";

import type { Money } from "@entity/shell";


const valueChange = (current: number, previous: number): number | null => {
	return previous === 0 ? null : ((current - previous) / Math.abs(previous)) * 100;
};

const moneyChange = (current: Money, previous: Money): number | null => {
	return valueChange(parseAmount(current.amount), parseAmount(previous.amount));
};

export { moneyChange, valueChange };
