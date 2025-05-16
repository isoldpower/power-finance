import { Tooltip } from "@visx/tooltip";
import { format } from "date-fns";
import type { FC } from "react";

import type { SpendingDataFlat } from "@entity/analytics";


interface ShowHoverTooltipProps {
    tooltipData?: SpendingDataFlat;
    tooltipTop?: number | undefined;
    tooltipLeft?: number | undefined;
}

const ShowHoverTooltip: FC<ShowHoverTooltipProps> = ({ 
    tooltipData,
    tooltipTop,
    tooltipLeft
}) => {
    return tooltipData && (
        <Tooltip
            key={Math.random()}
            top={tooltipTop ? tooltipTop - 40 : 0}
            left={tooltipLeft ? tooltipLeft + 40 : 0}
        >
            <div className="p-2">
                <div className="text-sm font-bold">
                    {format(tooltipData.date, "MMMM yyyy")}
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-chart-1" />
                    <span>
                        Income: ${tooltipData.income}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-chart-2" />
                    <span>
                        Expenses: ${tooltipData.expenses}
                    </span>
                </div>
            </div>
        </Tooltip>
    );
};

ShowHoverTooltip.displayName = 'ShowHoverTooltip';

export { ShowHoverTooltip };
export type { ShowHoverTooltipProps };