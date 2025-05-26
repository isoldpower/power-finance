import { useTooltip } from "@visx/tooltip";
import { ReactNode, useCallback } from "react";
import type { FC } from "react";

import type { CategorisedDataPiece } from "@entity/analytics/model";
import { Bar } from "@visx/shape";
import { localPoint } from "@visx/event";


interface RadarChartTooltipOverlayProps {
	tooltip: ReturnType<typeof useTooltip<CategorisedDataPiece>>;
	width: number;
	height: number;
	children?: ReactNode;
	points: { x: number, y: number }[];
	data: CategorisedDataPiece[];
}

interface PointDistance {
	distance: number;
	point: { x: number, y: number };
	index: number;
}

const RadarChartTooltipOverlay: FC<RadarChartTooltipOverlayProps> = ({ 
	tooltip,
	width,
	height,
	points,
	data,
	children
}) => {
	const { 
        tooltipData,
        showTooltip,
        hideTooltip,
    } = tooltip;
    
    const handleTooltip = useCallback((
        event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>
    ) => {
		const { x, y } = localPoint(event) ?? { x: 0, y: 0 };
		const { x: ajustedX, y: ajustedY } = { x: x - width / 2, y: y - height / 2 };

		const distances: PointDistance[] = points.map((point, index) => {
			const distance = Math.sqrt((point.x - ajustedX) ** 2 + (point.y - ajustedY) ** 2);

			return { distance, point, index };
		});
		const closestPoint = distances.sort((a, b) => a.distance - b.distance)[0];

		showTooltip({
			tooltipData: data.length > closestPoint.index ? data[closestPoint.index] : undefined,
			tooltipLeft: data.length > closestPoint.index ? closestPoint.point.x : undefined,
			tooltipTop: data.length > closestPoint.index ? closestPoint.point.y : undefined,
		});
    }, [data, height, points, showTooltip, width]);

    return width > 0 && height > 0 && (
        <>
            <Bar
                x={width / -2}
                y={height / -2}
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

RadarChartTooltipOverlay.displayName = 'RadarChartTooltipOverlay';

export { RadarChartTooltipOverlay };
export type { RadarChartTooltipOverlayProps };