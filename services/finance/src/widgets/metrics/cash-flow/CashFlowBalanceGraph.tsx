import type {CashFlowInsight} from "@feature/metrics";
import {CashPercentageGraph} from "@entity/metrics";

interface CashFlowBalanceGraphProps {
	cashFlow: CashFlowInsight;
}

const CashFlowBalanceGraph = ({
	cashFlow
}: CashFlowBalanceGraphProps) => {
	const total = cashFlow.in.amount + cashFlow.out.amount;
	const incomeShare = (cashFlow.in.amount / total) * 100;
	const expenseShare = (cashFlow.out.amount / total) * 100;

	return (
		<div className="fx-grow-x [animation-delay:0.4s] mt-[18px] flex h-2 overflow-hidden rounded-full bg-secondary">
			<CashPercentageGraph percentage={incomeShare} isPositive={true} />
			<div style={{ width: "1.5%" }} />
			<CashPercentageGraph percentage={expenseShare} isPositive={false} />
		</div>
	);
}

export { CashFlowBalanceGraph };