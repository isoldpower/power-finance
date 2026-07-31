import type { FC } from "react";

import { VIEW_W, VIEW_H } from "@shared/utils";


interface NetWorthSparklineProps {
	stroke: string;
	fill: string;
}

const NetWorthSparkline: FC<NetWorthSparklineProps> = ({ stroke, fill }) => (
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
);

NetWorthSparkline.displayName = 'NetWorthSparkline';

export { NetWorthSparkline };
export type { NetWorthSparklineProps };
