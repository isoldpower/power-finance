import { VIEW_H, VIEW_W } from "@shared/utils";

import type { FC, ReactNode } from "react";
import type { NetWorthInsight } from "@feature/metrics";


interface NetWorthHeroFxProps {
	isPending: boolean;
	isError: boolean;
	netWorth: NetWorthInsight | undefined;
	children: (netWorth: NetWorthInsight) => ReactNode;
}

const NetWorthHeroFx: FC<NetWorthHeroFxProps> = ({
	isPending,
	isError,
	netWorth,
	children,
}) => {
	if (isPending) {
		return <NetWorthHeroSkeleton />;
	} else if (isError || !netWorth) {
		return <NetWorthHeroFailed />;
	}
	
	return children(netWorth);
};

const NetWorthHeroSkeleton: FC = () => (
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

const NetWorthHeroFailed: FC = () => (
	<div className="mt-3 text-[13px] text-text-3">
		Couldn’t load net worth.
	</div>
);

export { NetWorthHeroFx };