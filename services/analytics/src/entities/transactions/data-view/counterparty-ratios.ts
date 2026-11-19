import { parseAmount } from "@internal/shared";

import type { CounterpartyRanking } from "../types.ts";


const counterpartyRatios = (ranking: CounterpartyRanking): number[] => {
	const amounts = ranking.counterparties.map((counterparty) => parseAmount(counterparty.amount.amount));
	const largest = Math.max(1, ...amounts);

	return amounts.map((amount) => amount / largest);
};

export { counterpartyRatios };
