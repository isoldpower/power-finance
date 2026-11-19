import { cn } from "@internal/ui-library";
import { useAnalyticsQuery } from "@feature/filters";
import { HideOnCompact, ShowOnPresent, useSelectedOption } from "@feature/interactions";
import { CategoryBreakdownCardFx, useCategoryBreakdown, useCategoryPalette } from "@feature/spending";
import { useOpenCategoryDrill } from "@feature/transactions";
import { BREAKDOWN_MODES, CategoryBreakdownChart, CategoryBreakdownList, SIDE_OPTIONS } from "@widget/spending";
import { ChartCard, SegmentedSwitch, useSeriesVisibility } from "@shared/charts";
import { useMoneyFormat } from "@shared/formatting";
import { CHART_HEIGHT, COMPACT_CHART_HEIGHT, COMPACT_LIST_ROWS } from "./config.ts";

import type { FC } from "react";
import type { LedgerSide } from "@entity/filters";
import type { BreakdownMode } from "@entity/spending";


interface CategoryBreakdownCardWithFxProps {
	compact?: boolean;
	className?: string;
}

const CategoryBreakdownCardWithFx: FC<CategoryBreakdownCardWithFxProps> = ({ compact = false, className }) => {
	const query = useAnalyticsQuery();
	const side = useSelectedOption<LedgerSide>('expense');
	const chartMode = useSelectedOption<BreakdownMode>('donut');
	const { breakdown, isPending, isError } = useCategoryBreakdown(query, side.selected);
	const colorOf = useCategoryPalette(query, side.selected);
	const formatMoney = useMoneyFormat();
	const focus = useSeriesVisibility();
	const handleSelect = useOpenCategoryDrill(side.selected);

	return (
		<ChartCard className={className}>
			<ChartCard.Header>
				<div>
					<ChartCard.Title>
						{compact ? 'Where it went' : 'Category breakdown'}
					</ChartCard.Title>
					<ShowOnPresent value={breakdown}>
						{(loaded) => (
							<ChartCard.Headline>
								{formatMoney(loaded.total)}
							</ChartCard.Headline>
						)}
					</ShowOnPresent>
					<ChartCard.Caption>
						Hover to compare, click a category to open its transactions
					</ChartCard.Caption>
				</div>
				<HideOnCompact compact={compact}>
					<ChartCard.Actions>
						<SegmentedSwitch
							label="Side"
							value={side.selected}
							options={SIDE_OPTIONS}
							onChange={side.select}
						/>
						<SegmentedSwitch
							label="Chart"
							value={chartMode.selected}
							options={BREAKDOWN_MODES}
							onChange={chartMode.select}
						/>
					</ChartCard.Actions>
				</HideOnCompact>
			</ChartCard.Header>
			<CategoryBreakdownCardFx
				isPending={isPending}
				isError={isError}
				breakdown={breakdown}
				height={CHART_HEIGHT}
			>
				{(loaded) => (
					<ChartCard.Body
						className={cn(
							"grid items-center gap-4",
							compact ? "sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]" : "lg:grid-cols-2",
						)}
					>
						<CategoryBreakdownChart
							breakdown={loaded}
							mode={compact ? 'donut' : chartMode.selected}
							side={side.selected}
							height={compact ? COMPACT_CHART_HEIGHT : CHART_HEIGHT}
							colorOf={colorOf}
							focused={focus.focused}
							onFocus={focus.focus}
							onSelect={handleSelect}
						/>
						<CategoryBreakdownList
							breakdown={loaded}
							side={side.selected}
							visibleRows={compact ? COMPACT_LIST_ROWS : undefined}
							height={compact ? undefined : CHART_HEIGHT}
							colorOf={colorOf}
							focused={focus.focused}
							onFocus={focus.focus}
							onSelect={handleSelect}
						/>
					</ChartCard.Body>
				)}
			</CategoryBreakdownCardFx>
		</ChartCard>
	);
};

CategoryBreakdownCardWithFx.displayName = 'CategoryBreakdownCardWithFx';

export { CategoryBreakdownCardWithFx };
export type { CategoryBreakdownCardWithFxProps };
