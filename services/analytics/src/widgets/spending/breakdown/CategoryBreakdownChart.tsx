import { useMemo } from "react";
import { breakdownTotalLabel, toBreakdownSlices, withoutOtherSlice } from "@entity/spending";
import { SwitchOnMode } from "@feature/interactions";
import { amountValue } from "@shared/formatting";
import { SLICE_LIMIT } from "../config.ts";
import { CategoryDonut } from "../donut";
import { CategoryRadar } from "../radar";
import { CategoryRadial } from "../radial";

import type { FC } from "react";
import type { LedgerSide } from "@entity/filters";
import type { BreakdownMode, BreakdownSlice, CategoryBreakdown } from "@entity/spending";


interface CategoryBreakdownChartProps {
	breakdown: CategoryBreakdown;
	mode: BreakdownMode;
	side: LedgerSide;
	height: number;
	colorOf: (key: string) => string;
	focused: string | null;
	onFocus: (key: string | null) => void;
	onSelect: (slice: BreakdownSlice) => void;
}

const CategoryBreakdownChart: FC<CategoryBreakdownChartProps> = ({
	breakdown,
	mode,
	side,
	height,
	colorOf,
	focused,
	onFocus,
	onSelect,
}) => {
	const slices = useMemo(() => toBreakdownSlices(breakdown, SLICE_LIMIT), [breakdown]);
	const radarSlices = useMemo(() => withoutOtherSlice(slices), [slices]);
	const currency = breakdown.total.currency;

	return (
		<SwitchOnMode
			mode={mode}
			views={{
				donut: (
					<CategoryDonut
						height={height}
						totalLabel={breakdownTotalLabel(side)}
						total={amountValue(breakdown.total)}
						categoryCount={breakdown.categories.length}
						slices={slices}
						currency={currency}
						colorOf={colorOf}
						focused={focused}
						onFocus={onFocus}
						onSelect={onSelect}
					/>
				),
				radar: (
					<CategoryRadar
						height={height}
						slices={radarSlices}
						currency={currency}
						colorOf={colorOf}
						focused={focused}
						onFocus={onFocus}
						onSelect={onSelect}
					/>
				),
				radial: (
					<CategoryRadial
						height={height}
						slices={slices}
						currency={currency}
						colorOf={colorOf}
						focused={focused}
						onFocus={onFocus}
						onSelect={onSelect}
					/>
				),
			}}
		/>
	);
};

CategoryBreakdownChart.displayName = 'CategoryBreakdownChart';

export { CategoryBreakdownChart };
export type { CategoryBreakdownChartProps };
