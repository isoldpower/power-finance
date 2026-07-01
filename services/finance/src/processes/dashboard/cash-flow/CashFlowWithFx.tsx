import type { FC } from "react";
import { FinanceCard, cn } from "@internal/ui-library";

import { useInsights } from "@feature/summary";

import { Period } from "@entity/dashboard";
import { CashFlowBalanceFx } from "@feature/metrics/fetch-experience/CashFlowBalanceFx.tsx";
import { CASH_FLOW_RANGE_LABELS } from "@widget/dashboard/config.ts";
import { CashFlowSavingRate } from "@widget/dashboard/cash-flow/CashFlowSavingRate.tsx";
import { CashFlowSavingFx } from "@feature/metrics/fetch-experience/CashFlowSavingFx.tsx";
import { CashFlowGraphFx } from "@feature/metrics/fetch-experience/CashFlowGraphFx.tsx";
import { CashFlowNetFx } from "@feature/metrics/fetch-experience/CashFlowNetFx.tsx";
import {CashFlowBalanceGraph} from "@widget/dashboard/cash-flow/CashFlowBalanceGraph.tsx";
import {CashFlowNet} from "@widget/dashboard/cash-flow/CashFlowNet.tsx";
import {CashFlowBalance} from "@widget/dashboard/cash-flow/CashFlowBalance.tsx";


interface CashFlowCardProps {
	period: Period;
	className?: string;
}

const CashFlowCardWithFx: FC<CashFlowCardProps> = ({ period, className }) => {
	const { cashFlow, isPending, isError } = useInsights({ 
		metrics: ['cash_flow'],
		range: period,
	});

	return (
		<FinanceCard className={cn("flex flex-col px-6 py-[22px]", className)}>
			<div className="flex items-center gap-2">
				<span className="font-numeric text-[11px] uppercase tracking-[0.14em] text-text-3">
					Cash flow · {CASH_FLOW_RANGE_LABELS[period] ?? 'This month'}
				</span>
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
							cashFlow={cashFlow.in}
							allFlows={[cashFlow.in, cashFlow.out]}
						/>
						<CashFlowBalance
							isPositive={false}
							title="Expense"
							cashFlow={cashFlow.out}
							allFlows={[cashFlow.in, cashFlow.out]}
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
		</FinanceCard>
	);
};

CashFlowCardWithFx.displayName = 'CashFlowCardWithFx';

export { CashFlowCardWithFx };
