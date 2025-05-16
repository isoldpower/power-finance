import { format } from "date-fns";
import type { FC } from "react";

import type { SpendingDataFlat } from "../model";
import { cn } from "@internal/ui-library";


interface GridChartThresholdTooltipProps {
	tooltipData?: SpendingDataFlat;
}

const GridChartThresholdTooltip: FC<GridChartThresholdTooltipProps> = ({
	tooltipData
}) => {
	const isSurplus = tooltipData && tooltipData.income > tooltipData.expenses;
	const calculateDifference = (income: number, expenses: number) => {
		return Math.round(Math.abs(income - expenses) * 100) / 100;
	};
	
	return tooltipData && (
		<div className="p-2 bg-popover">
			<div className="text-sm font-bold">
				{format(tooltipData.date, "MMMM yyyy")}
			</div>
			<div className="flex items-center gap-2 break-keep w-max">
				<div className={cn(
					"h-2 w-2 rounded-full",
					isSurplus ? "bg-chart-1" : "bg-chart-2"
				)} />
				<span>
					{isSurplus ? "Wallets Deficit" : "Wallets Surplus"}
					{" $" + calculateDifference(tooltipData.income, tooltipData.expenses).toString()}
				</span>
			</div>
		</div>
	);
};

GridChartThresholdTooltip.displayName = "GridChartThresholdTooltip";

export { GridChartThresholdTooltip };
export type { GridChartThresholdTooltipProps };