import type { FC } from "react";

import { VIEW_W, VIEW_H } from "@shared/utils";

const HeroSkeleton: FC = () => (
	<div>
		<div className="mt-2.5 h-[42px] w-56 animate-pulse rounded-[var(--radius-md)] bg-secondary" />
		<div className="mt-2 h-[18px] w-40 animate-pulse rounded bg-secondary" />
		<div className="mt-3.5 h-[92px]">
			<svg viewBox={`0 0 ${VIEW_W.toString()} ${VIEW_H.toString()}`} preserveAspectRatio="none" className="block h-full w-full">
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
	</div>
);

HeroSkeleton.displayName = 'HeroSkeleton';

export { HeroSkeleton };
