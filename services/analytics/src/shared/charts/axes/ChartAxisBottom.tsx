import { AxisBottom } from "@visx/axis";
import { AXIS_STROKE, TICK_LABEL_PROPS } from "./config.ts";

import type { FC } from "react";
import type { AxisScale } from "@visx/axis";


interface ChartAxisBottomProps {
	top: number;
	scale: AxisScale;
	numTicks?: number;
	tickFormat?: (value: unknown, index: number) => string;
	tickValues?: unknown[];
}

const ChartAxisBottom: FC<ChartAxisBottomProps> = ({ top, scale, numTicks = 6, tickFormat, tickValues }) => (
	<AxisBottom
		top={top}
		scale={scale}
		numTicks={numTicks}
		tickValues={tickValues as never}
		tickFormat={tickFormat as never}
		stroke={AXIS_STROKE}
		hideTicks
		tickLabelProps={() => ({ ...TICK_LABEL_PROPS, textAnchor: 'middle', dy: 4 })}
	/>
);

ChartAxisBottom.displayName = 'ChartAxisBottom';

export { ChartAxisBottom };
export type { ChartAxisBottomProps };
