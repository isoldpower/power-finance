import { useAnalyticsQuery } from "@feature/filters";
import { useGranularity } from "@feature/flow";
import { useSelectedOption } from "@feature/interactions";
import { CategoryTrendsCardFx, useCategoryPalette, useCategoryTrends } from "@feature/spending";
import { useOpenCategoryDrill } from "@feature/transactions";
import { GranularitySwitch } from "@widget/flow";
import { CategoryTrendsChart, SIDE_OPTIONS, TRENDS_MODES } from "@widget/spending";
import { ChartCard, SegmentedSwitch } from "@shared/charts";

import type { FC } from "react";
import type { LedgerSide } from "@entity/filters";
import type { TrendsMode } from "@entity/spending";


interface CategoryTrendsCardWithFxProps {
	className?: string;
}

const CHART_HEIGHT = 300;


const CategoryTrendsCardWithFx: FC<CategoryTrendsCardWithFxProps> = ({ className }) => {
	const query = useAnalyticsQuery();
	const side = useSelectedOption<LedgerSide>('expense');
	const chartMode = useSelectedOption<TrendsMode>('stacked');
	const { granularity, setGranularity } = useGranularity(query.range);
	const { trends, isPending, isError } = useCategoryTrends(query, side.selected, granularity);
	const colorOf = useCategoryPalette(query, side.selected);
	const handleSelect = useOpenCategoryDrill(side.selected);

	return (
		<ChartCard className={className}>
			<ChartCard.Header>
				<div>
					<ChartCard.Title>
						Categories over time
					</ChartCard.Title>
					<ChartCard.Caption>
						Toggle layers in the legend, click a layer to drill in
					</ChartCard.Caption>
				</div>
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
						options={TRENDS_MODES}
						onChange={chartMode.select}
					/>
					<GranularitySwitch range={query.range} value={granularity} onChange={setGranularity} />
				</ChartCard.Actions>
			</ChartCard.Header>
			<CategoryTrendsCardFx
				isPending={isPending}
				isError={isError}
				trends={trends}
				height={CHART_HEIGHT}
			>
				{(loaded) => (
					<CategoryTrendsChart
						trends={loaded}
						mode={chartMode.selected}
						currency={query.currency}
						colorOf={colorOf}
						onSelect={handleSelect}
						height={CHART_HEIGHT}
					/>
				)}
			</CategoryTrendsCardFx>
		</ChartCard>
	);
};

CategoryTrendsCardWithFx.displayName = 'CategoryTrendsCardWithFx';

export { CategoryTrendsCardWithFx };
export type { CategoryTrendsCardWithFxProps };
