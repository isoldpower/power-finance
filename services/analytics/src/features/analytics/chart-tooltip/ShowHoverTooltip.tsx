import { Tooltip } from "@visx/tooltip";
import type { FC, ReactNode } from "react";

import type { SpendingDataFlat } from "@entity/analytics/model";


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
	console.log(tooltipData, tooltipTop, tooltipLeft);
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