import { useAnalyticsQuery } from "@feature/filters";
import { MoneyFlowCardFx, useMoneyFlow } from "@feature/flow";
import { useCategoryPalette } from "@feature/spending";
import { useOpenFlowNodeDrill } from "@feature/transactions";
import { MoneyFlowSankey } from "@widget/flow";
import { ChartCard } from "@shared/charts";

import type { FC } from "react";


interface MoneyFlowCardWithFxProps {
	className?: string;
}

const CHART_HEIGHT = 540;


const MoneyFlowCardWithFx: FC<MoneyFlowCardWithFxProps> = ({ className }) => {
	const query = useAnalyticsQuery();
	const { moneyFlow, isPending, isError } = useMoneyFlow(query);
	const expenseColorOf = useCategoryPalette(query, 'expense');
	const handleSelectNode = useOpenFlowNodeDrill();

	return (
		<ChartCard className={className}>
			<ChartCard.Header>
				<div>
					<ChartCard.Title>
						Money flow
					</ChartCard.Title>
					<ChartCard.Caption>
						Income on the left, through your wallets, out to where it was spent — hover a stream, click to drill in
					</ChartCard.Caption>
				</div>
			</ChartCard.Header>
			<MoneyFlowCardFx
				isPending={isPending}
				isError={isError}
				moneyFlow={moneyFlow}
				height={CHART_HEIGHT}
			>
				{(loaded) => (
					<MoneyFlowSankey
						flow={loaded}
						currency={query.currency}
						expenseColorOf={expenseColorOf}
						onSelectNode={handleSelectNode}
						height={CHART_HEIGHT}
					/>
				)}
			</MoneyFlowCardFx>
		</ChartCard>
	);
};

MoneyFlowCardWithFx.displayName = 'MoneyFlowCardWithFx';

export { MoneyFlowCardWithFx };
export type { MoneyFlowCardWithFxProps };
