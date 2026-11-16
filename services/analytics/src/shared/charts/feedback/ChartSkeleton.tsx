import { useMemo } from "react";

import type { FC } from "react";


interface ChartSkeletonProps {
	height: number;
	bars?: number;
}

const SKELETON_HEIGHTS = [42, 68, 54, 80, 36, 62, 74, 48, 58, 70, 40, 66];
const STAGGER_MS = 70;

const SKELETON_BARS = SKELETON_HEIGHTS.map((barHeight, index) => {
	const delayMs = index * STAGGER_MS;

	return {
		key: barHeight,
		style: { height: `${barHeight.toString()}%`, animationDelay: `${delayMs.toString()}ms` },
	};
});

const ChartSkeleton: FC<ChartSkeletonProps> = ({ height, bars = 12 }) => {
	const visibleBars = useMemo(() => SKELETON_BARS.slice(0, bars), [bars]);

	return (
		<div aria-hidden className="flex w-full items-end gap-2" style={{ height }}>
			{visibleBars.map((bar) => (
				<span key={bar.key} className="flex-1 animate-pulse rounded-t-md bg-accent" style={bar.style} />
			))}
		</div>
	);
};

ChartSkeleton.displayName = 'ChartSkeleton';

export { ChartSkeleton };
export type { ChartSkeletonProps };
