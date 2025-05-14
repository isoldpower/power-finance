import { defaultStyles, useTooltipInPortal } from "@visx/tooltip";
import { format } from "date-fns";
import type { FC } from "react";

import type { SpendingDataFlat } from "@entity/analytics";


interface ShowHoverTooltipProps {
    tooltipData?: SpendingDataFlat;
    tooltipTop: number;
    tooltipLeft: number;
    TooltipInPortal: ReturnType<typeof useTooltipInPortal>['TooltipInPortal'];
}

const ShowHoverTooltip: FC<ShowHoverTooltipProps> = ({ 
    tooltipData,
    tooltipTop,
    tooltipLeft,
    TooltipInPortal
}) => {
    return tooltipData && (
        <TooltipInPortal 
            key={Math.random()}
            top={tooltipTop ? tooltipTop - 40 : 0}
            left={tooltipLeft ? tooltipLeft + 40 : 0}
            className="border bg-popover text-popover-foreground"
            style={defaultStyles}
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
        </TooltipInPortal>
    );
};

ShowHoverTooltip.displayName = 'ShowHoverTooltip';

export { ShowHoverTooltip };
export type { ShowHoverTooltipProps };