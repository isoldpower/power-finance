import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { Line } from "@visx/shape";
import type { SpendingDataFlat } from "../model";
import type { FC } from "react";


interface GridChartLinearOverlayProps {
	tooltipLeft?: number;
	tooltipData?: SpendingDataFlat;
	verticalScale: ReturnType<typeof scaleLinear<number | undefined>>;
	height: number;
}

const GridChartLinearOverlay: FC<GridChartLinearOverlayProps> = ({
	verticalScale,
	tooltipLeft,
	height,
	tooltipData,
}) => {
	return tooltipData && (
		<Group>
			<Line
				from={{ x: tooltipLeft, y: 0 }}
				to={{ x: tooltipLeft, y: height }}
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
				fill='var(--chart-2)'
				stroke="white"
				strokeWidth={2}
				pointerEvents="none"
			/>
			<circle
				cx={tooltipLeft}
				cy={verticalScale(tooltipData.expenses)}
				r={6}
				fill='var(--chart-1)'
				stroke="white"
				strokeWidth={2}
				pointerEvents="none"
			/>
		</Group>
	);
};

GridChartLinearOverlay.displayName = "GridChartLinearOverlay";

export { GridChartLinearOverlay };
export type { GridChartLinearOverlayProps };