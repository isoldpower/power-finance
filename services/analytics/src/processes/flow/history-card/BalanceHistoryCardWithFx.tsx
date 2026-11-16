import { useAnalyticsQuery } from "@feature/filters";
import { BalanceHistoryCardFx, useBalanceHistory } from "@feature/flow";
import { ShowOnPresent } from "@feature/interactions";
import { BalanceHistoryChart } from "@widget/flow";
import { ChartCard } from "@shared/charts";
import { useMoneyFormat } from "@shared/formatting";
import { CHART_HEIGHT } from "./config.ts";

import type { FC } from "react";


interface BalanceHistoryCardWithFxProps {
	className?: string;
}

const BalanceHistoryCardWithFx: FC<BalanceHistoryCardWithFxProps> = ({ className }) => {
	const query = useAnalyticsQuery();
	const { history, isPending, isError } = useBalanceHistory(query);
	const formatMoney = useMoneyFormat();
	const latestTotal = history?.total.at(-1);

	return (
		<ChartCard className={className}>
			<ChartCard.Header>
				<div>
					<ChartCard.Title>
						Balances over time
					</ChartCard.Title>
					<ShowOnPresent value={latestTotal}>
						{(balance) => (
							<ChartCard.Headline>
								{formatMoney(balance)}
							</ChartCard.Headline>
						)}
					</ShowOnPresent>
					<ChartCard.Caption>
						Every wallet converted into your main currency, transfers included
					</ChartCard.Caption>
				</div>
			</ChartCard.Header>
			<BalanceHistoryCardFx
				isPending={isPending}
				isError={isError}
				history={history}
				height={CHART_HEIGHT}
			>
				{(loaded) => (
					<BalanceHistoryChart
						history={loaded}
						currency={query.currency}
						height={CHART_HEIGHT}
					/>
				)}
			</BalanceHistoryCardFx>
		</ChartCard>
	);
};

BalanceHistoryCardWithFx.displayName = 'BalanceHistoryCardWithFx';

export { BalanceHistoryCardWithFx };
export type { BalanceHistoryCardWithFxProps };
