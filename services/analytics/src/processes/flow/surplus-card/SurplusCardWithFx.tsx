import { useAnalyticsQuery } from "@feature/filters";
import { SurplusCardFx, useCashFlow, useGranularity } from "@feature/flow";
import { useSelectedOption } from "@feature/interactions";
import { GranularitySwitch, SURPLUS_MODES, SurplusChart } from "@widget/flow";
import {
	ChartCard,
	ChartLegend,
	INFLOW_COLOR,
	OUTFLOW_COLOR,
	SegmentedSwitch,
} from "@shared/charts";
import { CHART_HEIGHT } from "./config";

import type { FC } from "react";
import type { SurplusMode } from "@entity/flow";


interface SurplusCardWithFxProps {
	className?: string;
}

const SurplusCardWithFx: FC<SurplusCardWithFxProps> = ({ className }) => {
	const query = useAnalyticsQuery();
	const chartMode = useSelectedOption<SurplusMode>('threshold');
	const { granularity, setGranularity } = useGranularity(query.range);
	const { cashFlow, isPending, isError } = useCashFlow(query, granularity);

	return (
		<ChartCard className={className}>
			<ChartCard.Header>
				<div>
					<ChartCard.Title>
						Surplus &amp; deficit
					</ChartCard.Title>
					<ChartCard.Caption>
						Running income against running expenses — green means you are ahead
					</ChartCard.Caption>
				</div>
				<ChartCard.Actions>
					<SegmentedSwitch
						label="Chart"
						value={chartMode.selected}
						options={SURPLUS_MODES}
						onChange={chartMode.select}
					/>
					<GranularitySwitch
						range={query.range}
						value={granularity}
						onChange={setGranularity}
					/>
				</ChartCard.Actions>
			</ChartCard.Header>
			<SurplusCardFx
				isPending={isPending}
				isError={isError}
				cashFlow={cashFlow}
				height={CHART_HEIGHT}
			>
				{(loaded) => (
					<SurplusChart
						cashFlow={loaded}
						mode={chartMode.selected}
						height={CHART_HEIGHT}
					/>
				)}
			</SurplusCardFx>
			<ChartLegend label="Surplus legend">
				<ChartLegend.Item color={INFLOW_COLOR} label="Earned" />
				<ChartLegend.Item color={OUTFLOW_COLOR} label="Spent" />
			</ChartLegend>
		</ChartCard>
	);
};

SurplusCardWithFx.displayName = 'SurplusCardWithFx';

export { SurplusCardWithFx };
export type { SurplusCardWithFxProps };
