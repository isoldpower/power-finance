import { useAnalyticsQuery } from "@feature/filters";
import { CashFlowCardFx, useCashFlow, useGranularity } from "@feature/flow";
import { SwitchOnMode, useSelectedOption } from "@feature/interactions";
import { useOpenBucketDrill } from "@feature/transactions";
import {
	BalanceAreaChart,
	CASH_FLOW_MODES,
	CashFlowBarsChart,
	CashFlowTotals,
	GranularitySwitch,
} from "@widget/flow";
import { ChartCard, SegmentedSwitch } from "@shared/charts";
import { CHART_HEIGHT } from "./config.ts";

import type { FC } from "react";
import type { CashFlowMode } from "@entity/flow";


interface CashFlowCardWithFxProps {
	className?: string;
}

const CashFlowCardWithFx: FC<CashFlowCardWithFxProps> = ({ className }) => {
	const query = useAnalyticsQuery();
	const chartMode = useSelectedOption<CashFlowMode>('bars');
	const { granularity, setGranularity } = useGranularity(query.range);
	const { cashFlow, isPending, isError } = useCashFlow(query, granularity);
	const handleSelectBucket = useOpenBucketDrill(granularity);

	return (
		<ChartCard className={className}>
			<ChartCard.Header>
				<div>
					<ChartCard.Title>
						Cash flow
					</ChartCard.Title>
					<ChartCard.Caption>
						Click a period to see what moved the money
					</ChartCard.Caption>
				</div>
				<ChartCard.Actions>
					<SegmentedSwitch
						label="Chart"
						value={chartMode.selected}
						options={CASH_FLOW_MODES}
						onChange={chartMode.select}
					/>
					<GranularitySwitch
						range={query.range}
						value={granularity}
						onChange={setGranularity}
					/>
				</ChartCard.Actions>
			</ChartCard.Header>
			<CashFlowCardFx
				isPending={isPending}
				isError={isError}
				cashFlow={cashFlow}
				height={CHART_HEIGHT}
			>
				{(loaded) => (
					<ChartCard.Body className="flex flex-col gap-4">
						<CashFlowTotals totals={loaded.totals} />
						<SwitchOnMode
							mode={chartMode.selected}
							views={{
								bars: (
									<CashFlowBarsChart
										cashFlow={loaded}
										height={CHART_HEIGHT}
										onSelectBucket={handleSelectBucket}
									/>
								),
								balance: (
									<BalanceAreaChart
										cashFlow={loaded}
										height={CHART_HEIGHT}
									/>
								),
							}}
						/>
					</ChartCard.Body>
				)}
			</CashFlowCardFx>
		</ChartCard>
	);
};

CashFlowCardWithFx.displayName = 'CashFlowCardWithFx';

export { CashFlowCardWithFx };
export type { CashFlowCardWithFxProps };
