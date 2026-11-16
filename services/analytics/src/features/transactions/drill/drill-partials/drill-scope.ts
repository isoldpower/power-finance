import { dayRange } from "@entity/filters";

import type { AnalyticsQuery, Drill } from "@entity/filters";
import type { TransactionsFilter } from "@entity/transactions";


interface DrillScope {
	query: AnalyticsQuery;
	filter: TransactionsFilter;
}

const drillScope = (drill: Drill, base: AnalyticsQuery): DrillScope => {
	switch (drill.kind) {
		case 'category':
			return { query: base, filter: { side: drill.side, categoryIds: [drill.category?.id ?? null] } };
		case 'counterparty':
			return { query: base, filter: { side: drill.side, name: drill.name } };
		case 'day':
			return { query: { ...base, range: dayRange(drill.date) }, filter: {} };
		case 'bucket':
			return { query: { ...base, range: drill.range }, filter: {} };
		case 'wallet':
			return { query: { ...base, walletIds: [drill.wallet.id] }, filter: {} };
	}
};

export { drillScope };
export type { DrillScope };
