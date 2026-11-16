import { GridRows } from "@visx/grid";
import { GRID_COLOR } from "../palette";

import type { FC } from "react";
import type { AxisScale } from "@visx/axis";


interface ChartGridRowsProps {
	scale: AxisScale<number>;
	width: number;
	numTicks?: number;
}

const ChartGridRows: FC<ChartGridRowsProps> = ({ scale, width, numTicks = 4 }) => (
	<GridRows scale={scale} width={width} numTicks={numTicks} stroke={GRID_COLOR} strokeDasharray="3 4" />
);

ChartGridRows.displayName = 'ChartGridRows';

export { ChartGridRows };
export type { ChartGridRowsProps };
