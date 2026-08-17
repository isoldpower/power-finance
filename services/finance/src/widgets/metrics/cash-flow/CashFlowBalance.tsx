import { cn } from "@internal/ui-library";
import { AnimatedMoney } from "@entity/localization";
import { useConvertedCashFlow } from "@feature/metrics";
import { useMemo } from "react";

import type { CashFlow } from "@entity/metrics";
import { Text, textClass } from "@shared/pure-components/typography";


interface CashFlowBalanceProps {
	title: string
	cashFlow: CashFlow
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
			<Text as="div" size="xs" tone="muted" className="flex items-center gap-1.5">
				<span className={cn(
					"size-[7px] rounded-[2px]",
					isPositive ? "bg-pos" : "bg-neg",
				)} />
				{title}
			</Text>
			<AnimatedMoney
				{...relatedFlow}
				tone={isPositive ? "pos" : "neg"}
				size="xl"
				className={cn(textClass({ size: '26' }), "mt-1 block")}
			/>
		</div>
	);
};


export { CashFlowBalance };