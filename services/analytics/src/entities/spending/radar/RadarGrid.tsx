import { useMemo } from "react";

import type { FC } from "react";


interface RadarGridProps {
	rings: string[];
	spokes: { x: number; y: number }[];
}

const RadarGrid: FC<RadarGridProps> = ({ rings, spokes }) => {
	const keyedSpokes = useMemo(() => {
		return spokes.map((spoke) => ({
			...spoke,
			key: `${spoke.x.toFixed(2)},${spoke.y.toFixed(2)}`,
		}));
	}, [spokes]);

	return (
		<g pointerEvents="none">
			{rings.map((points) => (
				<polygon key={points} points={points} fill="none" stroke="var(--chart-grid)" strokeWidth={1} />
			))}
			{keyedSpokes.map((spoke) => (
				<line
					key={spoke.key}
					x1={0}
					y1={0}
					x2={spoke.x}
					y2={spoke.y}
					stroke="var(--chart-grid)"
					strokeWidth={1}
				/>
			))}
		</g>
	);
};

RadarGrid.displayName = 'RadarGrid';

export { RadarGrid };
export type { RadarGridProps };
