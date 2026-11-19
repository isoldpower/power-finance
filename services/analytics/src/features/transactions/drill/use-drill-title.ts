import { useMemo } from "react";
import { categoryLabel } from "@entity/spending";
import { ACCENT_COLOR, INFLOW_COLOR, OUTFLOW_COLOR } from "@shared/charts";
import { useDateFormat } from "@shared/formatting";
import { GRANULARITY_LABEL, MIDDAY_SUFFIX, SIDE_LABEL } from "./config.ts";

import type { DateRange, Drill } from "@entity/filters";


interface DrillTitle {
	overline: string[];
	title: string;
	subtitle: string;
	accent: string;
}

const useDrillTitle = (drill: Drill, range: DateRange): DrillTitle => {
	const { formatDay, formatBucket, formatRange } = useDateFormat();

	return useMemo(() => {
		const period = formatRange(range.since, range.until);

		switch (drill.kind) {
			case 'category':
				return {
					overline: [SIDE_LABEL[drill.side], 'category'],
					title: categoryLabel(drill.category),
					subtitle: period,
					accent: drill.side === 'income' ? INFLOW_COLOR : OUTFLOW_COLOR,
				};
			case 'counterparty':
				return {
					overline: [SIDE_LABEL[drill.side], 'counterparty'],
					title: drill.name,
					subtitle: period,
					accent: drill.side === 'income' ? INFLOW_COLOR : OUTFLOW_COLOR,
				};
			case 'day':
				return {
					overline: ['Single day'],
					title: formatDay(`${drill.date}${MIDDAY_SUFFIX}`),
					subtitle: 'All wallets in scope',
					accent: ACCENT_COLOR,
				};
			case 'bucket':
				return {
					overline: [`${GRANULARITY_LABEL[drill.granularity]} in focus`],
					title: drill.granularity === 'month'
						? formatBucket(drill.range.since, 'month')
						: formatRange(drill.range.since, drill.range.until),
					subtitle: 'Income and expenses of the period',
					accent: ACCENT_COLOR,
				};
			case 'wallet':
				return { overline: ['Wallet'], title: drill.wallet.name, subtitle: period, accent: drill.wallet.color };
		}
	}, [drill, range, formatDay, formatBucket, formatRange]);
};

export { useDrillTitle };
export type { DrillTitle };
