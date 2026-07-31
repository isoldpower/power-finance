import { useMemo } from "react";
import { FinanceTooltip } from "@internal/ui-library";

import type { ReactNode } from "react";
import type { ConvertedMoney } from "@feature/localization";
import type { FC } from "react";


interface ShowCashBalanceTipProps {
	children: ReactNode;
	cashFlow: ConvertedMoney;
	percentsShare: number;
}

const ShowCashBalanceTip: FC<ShowCashBalanceTipProps> = ({
	children,
	cashFlow,
	percentsShare,
}) => {
	const tooltipContent = useMemo<string>(() => {
		const roundedIncomeShare = Math.round(percentsShare).toString();

		return `${roundedIncomeShare}% of gross flow · ${cashFlow.formatted}`;
	}, [cashFlow.formatted, percentsShare]);
	
	return (
		<FinanceTooltip content={tooltipContent}>
			{children}
		</FinanceTooltip>
	);
}

export { ShowCashBalanceTip };