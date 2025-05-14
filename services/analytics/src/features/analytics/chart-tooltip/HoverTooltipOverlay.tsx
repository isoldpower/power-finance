import { useCallback } from "react";
import { localPoint } from "@visx/event"
import { useTooltip } from "@visx/tooltip";
import { scaleLinear, scaleTime } from "@visx/scale";
import { Bar, Line } from "@visx/shape";
import { Group } from "@visx/group";
import { bisector } from "d3-array"
import type { FC } from "react";

import type { SpendingDataFlat } from "@entity/analytics";


interface HoverTooltipOverlayProps {
    horizontalScale: ReturnType<typeof scaleTime<number | undefined>>;
    verticalScale: ReturnType<typeof scaleLinear<number | undefined>>;
    dataset: SpendingDataFlat[];
    margin: { top: number; right: number; bottom: number; left: number };
}


const HoverTooltipOverlay: FC<HoverTooltipOverlayProps> = ({
    horizontalScale,
    verticalScale,
    dataset,
    margin,
}) => {
    const { 
        tooltipData,
        showTooltip,
        hideTooltip,
        tooltipLeft,
    } = useTooltip<SpendingDataFlat>();
    
    const handleTooltip = useCallback((
        event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>
    ) => {
        const { x: horizontalPoint } = localPoint(event) ?? { x: 0 };
        const absolutePoint = horizontalScale.invert(horizontalPoint - margin.left);

        const index = bisector((d: { date: string }) => d.date).left(dataset, absolutePoint.toISOString(), 1);
        const previousItem = dataset[index - 1];
        const nextItem = dataset[index];

        // Compare the distance to the previous and next item to determine which one to show
        let item = previousItem;
        if (nextItem.date) {
            const previousDistance = absolutePoint.valueOf() - new Date(previousItem.date).getTime();
            const nextDistance = new Date(nextItem.date).getTime() - absolutePoint.valueOf();

            item = previousDistance > nextDistance ? nextItem : previousItem;
        }

        showTooltip({
          tooltipData: item,
          tooltipLeft: horizontalScale(new Date(item.date)),
          tooltipTop: verticalScale(item.income),
        })
    }, [horizontalScale, margin.left, dataset, showTooltip, verticalScale]);

    return (
        <>
            <Bar
                x={0}
                y={0}
                width={innerWidth}
                height={innerHeight}
                fill="transparent"
                onTouchStart={handleTooltip}
                onTouchMove={handleTooltip}
                onMouseMove={handleTooltip}
                onMouseLeave={hideTooltip}
            />
            {tooltipData && (
                <Group>
                    <Line
                        from={{ x: tooltipLeft, y: 0 }}
                        to={{ x: tooltipLeft, y: innerHeight }}
                        stroke='var(--foreground)'
                        className="opacity-30"
                        strokeWidth={1}
                        strokeDasharray="5,2"
                        pointerEvents="none"
                    />
                    <circle
                        cx={tooltipLeft}
                        cy={verticalScale(tooltipData.income)}
                        r={6}
                        fill='var(--chart-1)'
                        stroke="white"
                        strokeWidth={2}
                        pointerEvents="none"
                    />
                    <circle
                        cx={tooltipLeft}
                        cy={verticalScale(tooltipData.expenses)}
                        r={6}
                        fill='var(--chart-2)'
                        stroke="white"
                        strokeWidth={2}
                        pointerEvents="none"
                    />
                </Group>
            )}
        </>
    )
}

HoverTooltipOverlay.displayName = 'HoverTooltipOverlay';

export { HoverTooltipOverlay };