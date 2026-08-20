import { VIEW_H, VIEW_W } from "../sparkline.ts";

import type { FC } from "react";


const NetWorthSkeletonGraph: FC = () => (
	<div className="mt-7 h-[91px]">
		<svg
			viewBox={`0 0 ${VIEW_W.toString()} ${VIEW_H.toString()}`}
			preserveAspectRatio="none"
			className="block h-full w-full"
		>
			<line
				x1="0"
				y1={VIEW_H / 2}
				x2={VIEW_W}
				y2={VIEW_H / 2}
				stroke="var(--border-strong)"
				strokeWidth="2"
				strokeLinecap="round"
				strokeDasharray="2 6"
				vectorEffect="non-scaling-stroke"
			/>
		</svg>
	</div>
);

NetWorthSkeletonGraph.displayName = 'NetWorthSkeletonGraph';

export { NetWorthSkeletonGraph };
