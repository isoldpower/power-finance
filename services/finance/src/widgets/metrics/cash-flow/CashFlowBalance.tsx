import { AnimatedMoney } from "@entity/localization";
import { Money, useConvertMoney } from "@feature/localization";
import { cn } from "@internal/ui-library";

import { useMemo } from "react";
import { CashFlowTooltip } from "./CashFlowTooltip.tsx";


interface CashFlowBalanceProps {
	cashFlow: Money
	allFlows: Money[]
	isPositive: boolean
	title: string
}

const CashFlowBalance = ({
	cashFlow,
	allFlows,
	isPositive,
	title,
}: CashFlowBalanceProps) => {
	const { convert } = useConvertMoney();
	const { convertedFlow } = useMemo(() => ({
		convertedFlow: convert(cashFlow),
	}), [cashFlow, convert]);
	const { sharePercents } = useMemo(() => {
		const total = allFlows.reduce((total, flow) => total + flow.amount, 0);
		
		return {
			sharePercents: (cashFlow.amount / total) * 100,
		};
	}, [cashFlow, allFlows]);
	
	return (
		<CashFlowTooltip cashFlow={convertedFlow} percentsShare={sharePercents}>
			<div className="cursor-help">
				<div className="flex items-center gap-1.5 text-xs text-text-2">
					<span className={cn(
						"size-[7px] rounded-[2px]",
						isPositive ? "bg-pos" : "bg-neg",
					)} />
					{title}
				</div>
				<AnimatedMoney
					amount={convertedFlow.amount}
					currency={convertedFlow.currency}
					tone={isPositive ? "pos" : "neg"}
					size="xl"
					className="mt-1 block text-[26px]"
				/>
			</div>
		</CashFlowTooltip>
	);
};


export { CashFlowBalance };