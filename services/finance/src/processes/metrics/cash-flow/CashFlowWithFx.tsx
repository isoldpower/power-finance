import { cn } from "@internal/ui-library";
import { NetWorthElevatedCard } from "@entity/metrics";
import {
	CashFlowBalanceFx,
	CashFlowSavingFx,
	CashFlowGraphFx,
	CashFlowNetFx,
	useInsights, 
	useMetricsPreferences,
} from "@feature/metrics";
import {
	CashFlowSavingRate,
	CashFlowBalanceGraph,
	CashFlowNet,
	CashFlowBalance,
	MetricPeriodTitle,
} from "@widget/metrics";

import type { FC } from "react";


interface CashFlowCardProps {
	className?: string;
}

const CashFlowWithFx: FC<CashFlowCardProps> = ({ className }) => {
	const period = useMetricsPreferences((state) => state.metricsPeriod);
	const { cashFlow, isPending, isError } = useInsights({ 
		metrics: ['cash_flow'],
		range: period,
	});

	return (
		<NetWorthElevatedCard className={cn("flex flex-col", className)}>
			<div className="flex items-center gap-2">
				<MetricPeriodTitle label="Cash flow" period={period} />
				<span className="flex-1" />
				<CashFlowSavingFx isPending={isPending} isError={isError} cashFlow={cashFlow}>
					{(cashFlow) => (
						<CashFlowSavingRate cashFlow={cashFlow} />
					)}
				</CashFlowSavingFx>
			</div>
			<CashFlowBalanceFx isPending={isPending} isError={isError} cashFlow={cashFlow}>
				{(cashFlow) => (
					<div className="mt-[18px] grid grid-cols-2 gap-3.5">
						<CashFlowBalance
							isPositive={true}
							title="Income"
							cashFlow={cashFlow}
						/>
						<CashFlowBalance
							isPositive={false}
							title="Expenses"
							cashFlow={cashFlow}
						/>
					</div>
				)}
			</CashFlowBalanceFx>
			<CashFlowGraphFx isPending={isPending} isError={isError} cashFlow={cashFlow}>
				{(cashFlow) => (
					<CashFlowBalanceGraph cashFlow={cashFlow} />
				)}
			</CashFlowGraphFx>
			<div className="flex-1" />
			<CashFlowNetFx isPending={isPending} isError={isError} cashFlow={cashFlow}>
				{(cashFlow) => (
					<CashFlowNet cashFlow={cashFlow} period={period} />
				)}
			</CashFlowNetFx>
		</NetWorthElevatedCard>
	);
};

CashFlowWithFx.displayName = 'CashFlowWithFx';

export { CashFlowWithFx };
