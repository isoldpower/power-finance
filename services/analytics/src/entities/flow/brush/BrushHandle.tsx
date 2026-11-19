import { useMemo } from "react";
import { HANDLE_WIDTH } from "./config.ts";

import type { FC } from "react";


interface BrushHandleProps {
	x: number;
	height: number;
}

const BrushHandle: FC<BrushHandleProps> = ({ x, height }) => {
	const transform = useMemo(() => {
		const horizontalShift = (x + HANDLE_WIDTH / 2).toFixed(1);
		const verticalShift = (height / 2 - 12).toFixed(1);

		return `translate(${horizontalShift}, ${verticalShift})`;
	}, [x, height]);

	return (
		<g transform={transform} pointerEvents="none">
			<rect
				x={-HANDLE_WIDTH / 2}
				width={HANDLE_WIDTH}
				height={24}
				rx={3}
				fill="var(--surface)"
				stroke="var(--primary)"
				strokeWidth={1.5}
			/>
			<line x1={-1.5} x2={-1.5} y1={7} y2={17} stroke="var(--primary)" strokeWidth={1} />
			<line x1={1.5} x2={1.5} y1={7} y2={17} stroke="var(--primary)" strokeWidth={1} />
		</g>
	);
};

BrushHandle.displayName = 'BrushHandle';

export { BrushHandle };
export type { BrushHandleProps };
