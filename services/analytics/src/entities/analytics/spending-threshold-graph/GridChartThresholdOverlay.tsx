import { Group } from "@visx/group";
import { Line } from "@visx/shape";
import type { FC } from "react";

import type { SpendingDataFlat } from "../model";


interface GridChartThresholdOverlayProps {
	tooltipLeft?: number;
	tooltipData?: SpendingDataFlat;
	height: number;
}

const GridChartThresholdOverlay: FC<GridChartThresholdOverlayProps> = ({
	tooltipLeft,
	height,
	tooltipData,
}) => {
	return tooltipData && (
		<Group>
			<Line
				from={{ x: tooltipLeft, y: 0 }}
				to={{ x: tooltipLeft, y: height }}
				pointerEvents="none"
				stroke='var(--foreground)'
				strokeWidth={1}
				strokeDasharray="5,2"
				className="opacity-30"
			/>
		</Group>
	);
};

GridChartThresholdOverlay.displayName = "GridChartThresholdOverlay";

export { GridChartThresholdOverlay };
export type { GridChartThresholdOverlayProps };