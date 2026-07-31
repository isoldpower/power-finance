import { ShowCashBalanceTip, useCashFlowShare, useConvertedCashFlow } from "@feature/metrics";
import { CashPercentageGraph } from "@entity/metrics";

import type { CashFlowInsight } from "@feature/metrics";


interface CashFlowBalanceGraphProps {
	cashFlow: CashFlowInsight;
}

const CashFlowBalanceGraph = ({
	cashFlow
}: CashFlowBalanceGraphProps) => {
	const { convertedInflow, convertedOutflow } = useConvertedCashFlow(cashFlow);
	const { inflowShare, outflowShare } = useCashFlowShare(cashFlow);
	
	return (
		<div className="cursor-help fx-grow-x [animation-delay:0.4s] mt-[18px] flex h-2 overflow-hidden rounded-full bg-secondary">
			<ShowCashBalanceTip cashFlow={convertedInflow} percentsShare={inflowShare}>
				<CashPercentageGraph percentage={inflowShare} isPositive={true} />
			</ShowCashBalanceTip>
			<div style={{ width: "1.5%" }} />
			<ShowCashBalanceTip cashFlow={convertedOutflow} percentsShare={outflowShare}>
				<CashPercentageGraph percentage={outflowShare} isPositive={false} />
			</ShowCashBalanceTip>
		</div>
	);
}

export { CashFlowBalanceGraph };