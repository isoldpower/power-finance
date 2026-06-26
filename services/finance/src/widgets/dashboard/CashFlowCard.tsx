import type { FC } from "react";
import { FinanceCard, FinanceMoney } from "@internal/ui-library";

// TODO wire to backend
const MOCK_CASH_FLOW = {
	income: "$7,420.00",
	expenses: "$3,020.10",
	net: "+$4,399.90",
	savingsRate: "59%",
	incomeShare: 71,
	expenseShare: 27.5,
};

const CashFlowCard: FC = () => {
	return (
		<FinanceCard className="flex flex-col px-6 py-[22px]">
			<div className="flex items-center gap-2">
				<span className="font-numeric text-[11px] uppercase tracking-[0.14em] text-text-3">
					Cash flow · June
				</span>
				<span className="flex-1" />
				<span className="text-xs text-text-3">
					Savings rate <b className="text-pos">{MOCK_CASH_FLOW.savingsRate}</b>
				</span>
			</div>
			<div className="mt-[18px] grid grid-cols-2 gap-3.5">
				<div>
					<div className="flex items-center gap-1.5 text-xs text-text-2">
						<span className="size-[7px] rounded-[2px] bg-pos" />
						Income
					</div>
					<FinanceMoney tone="pos" size="xl" className="mt-1 block">{MOCK_CASH_FLOW.income}</FinanceMoney>
				</div>
				<div>
					<div className="flex items-center gap-1.5 text-xs text-text-2">
						<span className="size-[7px] rounded-[2px] bg-neg" />
						Expenses
					</div>
					<FinanceMoney tone="neg" size="xl" className="mt-1 block">{MOCK_CASH_FLOW.expenses}</FinanceMoney>
				</div>
			</div>
			<div className="mt-[18px] flex h-2 overflow-hidden rounded-full bg-secondary">
				<div className="bg-pos" style={{ width: `${MOCK_CASH_FLOW.incomeShare}%` }} />
				<div style={{ width: "1.5%" }} />
				<div className="bg-neg" style={{ width: `${MOCK_CASH_FLOW.expenseShare}%` }} />
			</div>
			<div className="flex-1" />
			<div className="mt-[18px] flex items-center justify-between border-t border-border pt-3.5">
				<span className="text-[13px] text-text-2">Net this month</span>
				<FinanceMoney tone="pos" size="lg">{MOCK_CASH_FLOW.net}</FinanceMoney>
			</div>
		</FinanceCard>
	);
};

CashFlowCard.displayName = 'CashFlowCard';

export { CashFlowCard };
