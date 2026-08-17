import { useMemo } from "react";
import { useConvertMoney } from "@feature/localization";
import { Tooltip } from "@shared/overlays";

import type { CashFlow } from "@entity/metrics";
import type { ReactNode, FC } from "react";


interface ShowSavingRateTooltipProps {
	cashFlow: CashFlow;
	children: ReactNode;
}

const ShowSavingRateTooltip: FC<ShowSavingRateTooltipProps> = ({ 
	cashFlow,
	children,
}) => {
	const { convert } = useConvertMoney();
	const tooltipContent = useMemo(() => {
		const netFormatted = convert(cashFlow.totalNet).formatted;
		const inflowFormatted = convert(cashFlow.inflow).formatted;

		return `Net ${netFormatted} kept of ${inflowFormatted} income`;
	}, [convert, cashFlow]);
	
	return (
		<Tooltip content={tooltipContent}>
			{children}
		</Tooltip>
	);
}

export { ShowSavingRateTooltip };