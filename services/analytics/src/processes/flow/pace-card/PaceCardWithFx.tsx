import { useAnalyticsQuery } from "@feature/filters";
import { PaceCardFx, useSpendingPace } from "@feature/flow";
import { ShowOnPresent } from "@feature/interactions";
import { PaceLegend, SpendingPaceChart } from "@widget/flow";
import { ChartCard } from "@shared/charts";
import { formatSignedPercent, useMoneyFormat } from "@shared/formatting";

import type { FC } from "react";


interface PaceCardWithFxProps {
	className?: string;
}

const CHART_HEIGHT = 280;

const PaceCardWithFx: FC<PaceCardWithFxProps> = ({ className }) => {
	const query = useAnalyticsQuery();
	const { pace, outflowChange, isPending, isError } = useSpendingPace(query);
	const formatMoney = useMoneyFormat();

	return (
		<ChartCard className={className}>
			<ChartCard.Header>
				<div>
					<ChartCard.Title>
						Spending pace
					</ChartCard.Title>
					<ShowOnPresent value={pace}>
						{(loaded) => (
							<ChartCard.Headline>
								{formatMoney(loaded.current.totals.outflow)}
							</ChartCard.Headline>
						)}
					</ShowOnPresent>
					<ChartCard.Caption>
						<ShowOnPresent value={outflowChange} fallback="Cumulative spending against the previous period">
							{(change) => `${formatSignedPercent(change)} vs the previous period`}
						</ShowOnPresent>
					</ChartCard.Caption>
				</div>
				<PaceLegend />
			</ChartCard.Header>
			<PaceCardFx
				isPending={isPending}
				isError={isError}
				pace={pace}
				height={CHART_HEIGHT}
			>
				{(loaded) => (
					<SpendingPaceChart
						current={loaded.current}
						previous={loaded.previous}
						height={CHART_HEIGHT}
					/>
				)}
			</PaceCardFx>
		</ChartCard>
	);
};

PaceCardWithFx.displayName = 'PaceCardWithFx';

export { PaceCardWithFx };
export type { PaceCardWithFxProps };
