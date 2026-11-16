import { useMemo } from "react";
import { Text } from "@internal/shared";

import type { FC } from "react";


interface HeatLegendProps {
	colors: string[];
	lowLabel: string;
	highLabel: string;
}

const HeatLegend: FC<HeatLegendProps> = ({ colors, lowLabel, highLabel }) => {
	const swatches = useMemo(() => {
		return colors.map((color) => ({ color, style: { background: color } }));
	}, [colors]);

	return (
		<div className="flex items-center gap-1.5" aria-hidden>
			<Text size="11" tone="subtle">
				{lowLabel}
			</Text>
			{swatches.map((swatch) => (
				<span key={swatch.color} className="size-3 rounded-[3px]" style={swatch.style} />
			))}
			<Text size="11" tone="subtle">
				{highLabel}
			</Text>
		</div>
	);
};

HeatLegend.displayName = 'HeatLegend';

export { HeatLegend };
export type { HeatLegendProps };
