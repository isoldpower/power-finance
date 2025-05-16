import { Tooltip } from "@visx/tooltip";
import { format } from "date-fns";
import type { FC, ReactNode } from "react";

import type { SpendingDataFlat } from "@entity/analytics";


interface ShowHoverTooltipProps {
    tooltipData?: SpendingDataFlat;
    tooltipTop?: number | undefined;
    tooltipLeft?: number | undefined;
	children: ReactNode;
}

const ShowHoverTooltip: FC<ShowHoverTooltipProps> = ({ 
    tooltipData,
    tooltipTop,
    tooltipLeft,
	children
}) => {
    return tooltipData && (
        <Tooltip
            key={Math.random()}
            top={tooltipTop ? tooltipTop - 40 : 0}
            left={tooltipLeft ? tooltipLeft + 40 : 0}
        >
            {children}
        </Tooltip>
    );
};

ShowHoverTooltip.displayName = 'ShowHoverTooltip';

export { ShowHoverTooltip };
export type { ShowHoverTooltipProps };