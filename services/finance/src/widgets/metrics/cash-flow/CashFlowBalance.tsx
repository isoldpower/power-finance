import { cn } from "@internal/ui-library";
import { AnimatedMoney } from "@entity/localization";
import { useConvertedCashFlow } from "@feature/metrics";
import { useMemo } from "react";

import type { CashFlowInsight } from "@feature/metrics";


interface CashFlowBalanceProps {
	title: string
	cashFlow: CashFlowInsight
	isPositive: boolean
}

const CashFlowBalance = ({
	cashFlow,
	isPositive,
	title,
}: CashFlowBalanceProps) => {
	const { convertedInflow, convertedOutflow } = useConvertedCashFlow(cashFlow);
	const relatedFlow = useMemo(() => {
		return isPositive ? convertedInflow : convertedOutflow;
	}, [convertedInflow, convertedOutflow, isPositive]);
	
	return (
		<div className='flex flex-col'>
			<div className="flex items-center gap-1.5 text-xs text-text-2">
				<span className={cn(
					"size-[7px] rounded-[2px]",
					isPositive ? "bg-pos" : "bg-neg",
				)} />
				{title}
			</div>
			<AnimatedMoney
				{...relatedFlow}
				tone={isPositive ? "pos" : "neg"}
				size="xl"
				className="mt-1 block text-[26px]"
			/>
		</div>
	);
};


export { CashFlowBalance };