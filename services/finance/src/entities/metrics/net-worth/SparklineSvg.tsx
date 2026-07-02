import type { FC } from "react";

import { VIEW_W, VIEW_H } from "@shared/utils";

interface SparklinePoint {
	xPct: number;
	yPct: number;
}

interface SparklineSvgProps {
	stroke: string;
	fill: string;
	lastY: number;
	active: SparklinePoint | null;
}

const SparklineSvg: FC<SparklineSvgProps> = ({ stroke, fill, lastY, active }) => (
	<>
		<svg viewBox={`0 0 ${VIEW_W.toString()} ${VIEW_H.toString()}`} preserveAspectRatio="none" className="block h-full w-full overflow-visible">
			<defs>
				<linearGradient id="netWorthSpark" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor="var(--primary)" stopOpacity="0.22" />
					<stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
				</linearGradient>
				<clipPath id="netWorthWipe">
					<rect x="0" y={-VIEW_H} width={VIEW_W} height={VIEW_H * 3} className="fx-wipe" />
				</clipPath>
			</defs>
			<path d={fill} fill="url(#netWorthSpark)" className="fx-fade [animation-delay:0.7s]" />
			<path d={stroke} clipPath="url(#netWorthWipe)" fill="none" stroke="var(--primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
		</svg>

		{/* End dot — HTML element stays a perfect circle under preserveAspectRatio="none"; inset from the right edge so it sits inside the plot. */}
		{!active ? (
			<span
				className="fx-fade [animation-delay:1.5s] pointer-events-none absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--surface)] bg-[var(--primary)]"
				style={{ left: 'calc(100% - 5px)', top: `${((lastY / VIEW_H) * 100).toFixed(2)}%` }}
			/>
		) : null}

		{active ? (
			<>
				{/* Overshoots vertically — the card's overflow-hidden clips it to the full card height. */}
				<div className="pointer-events-none absolute -top-[300px] -bottom-[300px] border-l border-dashed border-border-strong" style={{ left: `${active.xPct.toFixed(2)}%` }} />
				<span
					className="pointer-events-none absolute size-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--surface)] bg-[var(--primary)] shadow-[0_0_0_1px_var(--primary)]"
					style={{ left: `${active.xPct.toFixed(2)}%`, top: `${active.yPct.toFixed(2)}%` }}
				/>
			</>
		) : null}
	</>
);

SparklineSvg.displayName = 'SparklineSvg';

export { SparklineSvg };
export type { SparklineSvgProps };
