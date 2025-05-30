import { Tooltip } from "@visx/tooltip";
import type { FC, ReactNode } from "react";

import type { CategorisedDataPiece } from "@entity/analytics/model";


interface ShowRadarChartTooltipProps {
    tooltipData?: CategorisedDataPiece;
    tooltipTop?: number | undefined;
    tooltipLeft?: number | undefined;
	children: ReactNode;
	width: number;
	height: number;
}

const ShowRadarChartTooltip: FC<ShowRadarChartTooltipProps> = ({ 
    tooltipData,
    tooltipTop,
    tooltipLeft,
	height,
	width,
	children
}) => {
    return tooltipData && (
        <Tooltip
            key={Math.random()}
            top={(tooltipTop ?? 0) + height / 2}
            left={(tooltipLeft ?? 0) + width / 2}
        >
            {children}
        </Tooltip>
    );
};

ShowRadarChartTooltip.displayName = 'ShowRadarChartTooltip';

export { ShowRadarChartTooltip };
export type { ShowRadarChartTooltipProps };