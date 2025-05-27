import { format } from "date-fns";
import type { FC } from "react";

import type { SpendingDataFlat } from "../model";


interface GridChartLinearTooltipProps {
	tooltipData?: SpendingDataFlat;
}

const GridChartLinearTooltip: FC<GridChartLinearTooltipProps> = ({
	tooltipData
}) => {
	return tooltipData && (
		<div className="p-2">
			<div className="text-sm font-bold">
				{format(tooltipData.date, "MMMM yyyy")}
			</div>
			<div className="flex items-center gap-2 break-keep w-max">
				<div className="h-2 w-2 rounded-full bg-chart-2" />
				<span>
					Income: ${tooltipData.income}
				</span>
			</div>
			<div className="flex items-center gap-2 break-keep w-max">
				<div className="h-2 w-2 rounded-full bg-chart-1" />
				<span>
					Expenses: ${tooltipData.expenses}
				</span>
			</div>
		</div>
	);
};

GridChartLinearTooltip.displayName = "GridChartLinearTooltip";

export { GridChartLinearTooltip };
export type { GridChartLinearTooltipProps };