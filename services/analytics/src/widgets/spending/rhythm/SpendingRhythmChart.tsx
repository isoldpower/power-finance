import { useParentSize } from "@visx/responsive";
import { ShowOnMeasured } from "@feature/interactions";
import { SpendingRhythmPlot } from "./chart-partials/SpendingRhythmPlot.tsx";

import type { FC } from "react";
import type { SpendingRhythm } from "@entity/spending";


interface SpendingRhythmChartProps {
	rhythm: SpendingRhythm;
	currency: string;
	color: string;
}

const SpendingRhythmChart: FC<SpendingRhythmChartProps> = ({ rhythm, currency, color }) => {
	const { parentRef, width } = useParentSize({ debounceTime: 60, ignoreDimensions: 'height' });

	return (
		<div ref={parentRef} role="figure" aria-label="Spending by weekday and hour" className="w-full">
			<ShowOnMeasured width={width}>
				{(measured) => (
					<SpendingRhythmPlot
						rhythm={rhythm}
						width={measured}
						currency={currency}
						color={color}
					/>
				)}
			</ShowOnMeasured>
		</div>
	);
};

SpendingRhythmChart.displayName = 'SpendingRhythmChart';

export { SpendingRhythmChart };
export type { SpendingRhythmChartProps };
