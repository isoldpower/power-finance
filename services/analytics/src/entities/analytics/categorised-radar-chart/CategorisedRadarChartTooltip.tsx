import type { FC } from "react";
import type { CategorisedDataPiece } from "../model";


interface CategorisedRadarChartTooltipProps {
    tooltipData?: CategorisedDataPiece;
}

const CategorisedRadarChartTooltip: FC<CategorisedRadarChartTooltipProps> = ({ tooltipData }) => {
    return (
		<div className="p-2 bg-popover">
			<div className="text-sm font-bold">
				{tooltipData?.category}
			</div>
			<div className="flex items-center gap-2 break-keep w-max">
				<div className="h-2 w-2 rounded-full bg-chart-1" />
				<span>
					Expenses: ${tooltipData?.amount.toFixed(2)}
				</span>
			</div>
		</div>
	);
};

export { CategorisedRadarChartTooltip };