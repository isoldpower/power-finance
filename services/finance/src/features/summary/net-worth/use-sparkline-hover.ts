import { useRef, useState } from "react";
import type { MouseEvent } from "react";

import type { ChartPoint } from "./build-sparkline.ts";

interface SparklineTip {
	x: number;
	y: number;
	onLeft: boolean;
}

// Owns the crosshair interaction: tracks the hovered point index and the tooltip anchor as the
// pointer moves across the chart. Pure geometry — no currency/formatting concerns.
const useSparklineHover = (points: ChartPoint[]) => {
	const ref = useRef<HTMLDivElement>(null);
	const [hover, setHover] = useState<number | null>(null);
	const [tip, setTip] = useState<SparklineTip | null>(null);

	const onMove = (event: MouseEvent<HTMLDivElement>) => {
		const rect = ref.current?.getBoundingClientRect();
		if (!rect || points.length === 0) return;
		const ratio = (event.clientX - rect.left) / rect.width;
		const index = Math.max(0, Math.min(points.length - 1, Math.round(ratio * (points.length - 1))));
		const point = points[index];
		setHover(index);
		setTip({
			x: rect.left + (point.xPct / 100) * rect.width,
			y: rect.top + (point.yPct / 100) * rect.height,
			onLeft: point.xPct > 60,
		});
	};

	const onLeave = () => {
		setHover(null);
		setTip(null);
	};

	const active = hover !== null ? points[hover] : null;

	return { ref, hover, tip, active, onMove, onLeave };
};

export { useSparklineHover };
export type { SparklineTip };
