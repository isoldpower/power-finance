import {FinanceTooltip} from "@internal/ui-library";
import {FC, PropsWithChildren, useMemo} from "react";
import {ConvertedMoney} from "@feature/fx";


type CashFlowTooltipProps = PropsWithChildren<{
	cashFlow: ConvertedMoney;
	percentsShare: number;
}>;

const CashFlowTooltip: FC<CashFlowTooltipProps> = ({
	cashFlow,
	percentsShare,
	children
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

export { CashFlowTooltip };