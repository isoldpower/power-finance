import { AxisLeft } from "@visx/axis";
import { TICK_LABEL_PROPS } from "./config.ts";

import type { FC } from "react";
import type { AxisScale } from "@visx/axis";


interface ChartAxisLeftProps {
	left?: number;
	scale: AxisScale;
	numTicks?: number;
	tickFormat?: (value: number) => string;
}

const ChartAxisLeft: FC<ChartAxisLeftProps> = ({ left = 0, scale, numTicks = 4, tickFormat }) => (
	<AxisLeft
		left={left}
		scale={scale}
		numTicks={numTicks}
		tickFormat={tickFormat ? (value) => tickFormat(Number(value)) : undefined}
		hideAxisLine
		hideTicks
		tickLabelProps={() => ({ ...TICK_LABEL_PROPS, textAnchor: 'end', dx: -6, dy: 3 })}
	/>
);

ChartAxisLeft.displayName = 'ChartAxisLeft';

export { ChartAxisLeft };
export type { ChartAxisLeftProps };
