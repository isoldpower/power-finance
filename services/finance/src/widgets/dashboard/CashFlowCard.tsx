import type { FC } from "react";
import { FinanceCard, FinanceTooltip, cn } from "@internal/ui-library";

import { AnimatedMoney } from "@shared/components";
import { useInsights } from "@feature/summary";
import { useConvertMoney } from "@feature/fx";

const RANGE_LABELS: Record<string, string> = {
	'1W': 'This week',
	'1M': 'This month',
	'3M': 'This quarter',
	'1Y': 'This year',
};

interface CashFlowCardProps {
	range?: string;
	className?: string;
}

const CashFlowCard: FC<CashFlowCardProps> = ({ range = '1M', className }) => {
	const { cashFlow, isPending, isError } = useInsights({ metrics: ['cash_flow'], range });
	const { convert } = useConvertMoney();

	const total = cashFlow ? cashFlow.in.amount + cashFlow.out.amount : 0;
	const incomeShare = total > 0 ? (cashFlow!.in.amount / total) * 100 : 0;
	const expenseShare = total > 0 ? (cashFlow!.out.amount / total) * 100 : 0;

	return (
		<FinanceCard className={cn("flex flex-col px-6 py-[22px]", className)}>
			<div className="flex items-center gap-2">
				<span className="font-numeric text-[11px] uppercase tracking-[0.14em] text-text-3">
					Cash flow · {RANGE_LABELS[range] ?? 'This month'}
				</span>
				<span className="flex-1" />
				{cashFlow ? (
					<FinanceTooltip content={`Net ${convert(cashFlow.net).formatted} kept of ${convert(cashFlow.in).formatted} income`}>
						<span className="cursor-help text-xs text-text-3">
							Savings rate <b className="text-pos">{Math.round(cashFlow.savingsRate * 100)}%</b>
						</span>
					</FinanceTooltip>
				) : null}
			</div>

			{isPending ? (
				<CashFlowSkeleton />
			) : isError || !cashFlow ? (
				<div className="mt-4 text-[13px] text-text-3">Couldn’t load cash flow.</div>
			) : (
				<>
					<div className="mt-[18px] grid grid-cols-2 gap-3.5">
						<FinanceTooltip content={`${Math.round(incomeShare).toString()}% of gross flow · ${convert(cashFlow.in).formatted}`}>
							<div className="cursor-help">
								<div className="flex items-center gap-1.5 text-xs text-text-2">
									<span className="size-[7px] rounded-[2px] bg-pos" />
									Income
								</div>
								<AnimatedMoney amount={convert(cashFlow.in).amount} currency={convert(cashFlow.in).currency} tone="pos" size="xl" className="mt-1 block text-[26px]" />
							</div>
						</FinanceTooltip>
						<FinanceTooltip content={`${Math.round(expenseShare).toString()}% of gross flow · ${convert(cashFlow.out).formatted}`}>
							<div className="cursor-help">
								<div className="flex items-center gap-1.5 text-xs text-text-2">
									<span className="size-[7px] rounded-[2px] bg-neg" />
									Expenses
								</div>
								<AnimatedMoney amount={convert(cashFlow.out).amount} currency={convert(cashFlow.out).currency} tone="neg" size="xl" className="mt-1 block text-[26px]" />
							</div>
						</FinanceTooltip>
					</div>
					<div className="fx-grow-x [animation-delay:0.4s] mt-[18px] flex h-2 overflow-hidden rounded-full bg-secondary">
						<div className="bg-pos" style={{ width: `${incomeShare.toFixed(1)}%` }} />
						<div style={{ width: "1.5%" }} />
						<div className="bg-neg" style={{ width: `${expenseShare.toFixed(1)}%` }} />
					</div>
					<div className="flex-1" />
					<div className="mt-[18px] flex items-center justify-between border-t border-border pt-3.5">
						<span className="text-[13px] text-text-2">Net · {(RANGE_LABELS[range] ?? 'This month').toLowerCase()}</span>
						<AnimatedMoney amount={convert(cashFlow.net).amount} currency={convert(cashFlow.net).currency} tone={cashFlow.net.amount >= 0 ? "pos" : "neg"} size="lg" className="text-[20px]" />
					</div>
				</>
			)}
		</FinanceCard>
	);
};

const CashFlowSkeleton: FC = () => (
	<div className="mt-[18px] flex flex-1 flex-col animate-pulse">
		<div className="grid grid-cols-2 gap-3.5">
			<div className="h-[42px] rounded-[var(--radius-md)] bg-secondary" />
			<div className="h-[42px] rounded-[var(--radius-md)] bg-secondary" />
		</div>
		<div className="mt-[18px] h-2 rounded-full bg-secondary" />
		<div className="flex-1" />
		<div className="mt-[18px] flex items-center justify-between border-t border-border pt-3.5">
			<div className="h-4 w-24 rounded bg-secondary" />
			<div className="h-6 w-28 rounded bg-secondary" />
		</div>
	</div>
);

CashFlowCard.displayName = 'CashFlowCard';

export { CashFlowCard };
