import { useMemo } from "react";
import { useConvertMoney } from "@feature/localization";
import { Tooltip } from "@shared/interactions";

import type { CashFlowInsight } from "@feature/metrics";
import type { ReactNode, FC } from "react";


interface ShowSavingRateTooltipProps {
	cashFlow: CashFlowInsight;
	children: ReactNode;
}

const ShowSavingRateTooltip: FC<ShowSavingRateTooltipProps> = ({ 
	cashFlow,
	children,
}) => {
	const { convert } = useConvertMoney();
	const tooltipContent = useMemo(() => {
		const netFormatted = convert(cashFlow.net).formatted;
		const inflowFormatted = convert(cashFlow.in).formatted;

		return `Net ${netFormatted} kept of ${inflowFormatted} income`;
	}, [convert, cashFlow]);
	
	return (
		<Tooltip content={tooltipContent}>
			{children}
		</Tooltip>
	);
}

export { ShowSavingRateTooltip };