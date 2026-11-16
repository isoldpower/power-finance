import { useMemo } from "react";

import type { FC } from "react";


interface BarHighlightProps {
	x: number;
	width: number;
	height: number;
}

const BarHighlight: FC<BarHighlightProps> = ({ x, width, height }) => {
	const highlightWidth = useMemo(() => {
		return Math.max(0, width);
	}, [width]);

	const highlightHeight = useMemo(() => {
		return Math.max(0, height);
	}, [height]);

	return (
		<rect
			x={x}
			y={0}
			width={highlightWidth}
			height={highlightHeight}
			rx={6}
			fill="var(--accent-soft)"
			pointerEvents="none"
		/>
	);
};

BarHighlight.displayName = 'BarHighlight';

export { BarHighlight };
export type { BarHighlightProps };
