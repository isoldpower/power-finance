import { useCallback } from "react";
import { localPoint } from "@visx/event"
import { useTooltip } from "@visx/tooltip";
import { scaleTime } from "@visx/scale";
import { Bar } from "@visx/shape";
import { bisector } from "d3-array"
import type { FC, ReactNode } from "react";

import type { SpendingDataFlat } from "@entity/analytics/model";


interface HoverTooltipOverlayProps {
    horizontalScale: ReturnType<typeof scaleTime<number | undefined>>;
    dataset: SpendingDataFlat[];
    margin: { top: number; right: number; bottom: number; left: number };
    tooltip: ReturnType<typeof useTooltip<SpendingDataFlat>>;
    width: number;
    height: number;
	children: ReactNode;
	computePosition: (item: SpendingDataFlat, point: { x: number, y: number }, index: number) => {
		tooltipLeft: number;
		tooltipTop: number;
	};
}

const HoverTooltipOverlay: FC<HoverTooltipOverlayProps> = ({
    horizontalScale,
    dataset,
    margin,
    tooltip,
    width,
    height,
	children,
	computePosition
}) => {
    const { 
        tooltipData,
        showTooltip,
        hideTooltip,
    } = tooltip;
    
    const handleTooltip = useCallback((
        event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>
    ) => {
        const { x: horizontalPoint, y: verticalPoint } = localPoint(event) ?? { x: 0, y: 0 };
        const absolutePoint = horizontalScale.invert(horizontalPoint - margin.left);
        const index = bisector((d: SpendingDataFlat) => d.date).left(dataset, absolutePoint);
        const previousItem = dataset[index - 1];
        const nextItem = index < dataset.length ? dataset[index] : undefined;

        // Compare the distance to the previous and next item to determine which one to show
        let item = previousItem;
        if (nextItem?.date) {
            const previousDistance = absolutePoint.valueOf() - previousItem.date;
            const nextDistance = nextItem.date - absolutePoint.valueOf();

            item = previousDistance > nextDistance ? nextItem : previousItem;
        }

        const { tooltipLeft, tooltipTop } = computePosition(
			item,
			{ x: horizontalPoint, y: verticalPoint }, 
			nextItem?.date ? index : index - 1
		);

        showTooltip({
          tooltipData: item,
          tooltipLeft,
          tooltipTop,
        });
    }, [horizontalScale, margin.left, dataset, computePosition, showTooltip]);

    return width > 0 && height > 0 && (
        <>
            <Bar
                x={0}
                y={0}
                width={width}
                height={height}
                fill="transparent"
                onTouchStart={handleTooltip}
                onTouchMove={handleTooltip}
                onMouseMove={handleTooltip}
                onMouseLeave={hideTooltip}
            />
            {tooltipData && (
                children
            )}
        </>
    )
}

HoverTooltipOverlay.displayName = 'HoverTooltipOverlay';

export { HoverTooltipOverlay };