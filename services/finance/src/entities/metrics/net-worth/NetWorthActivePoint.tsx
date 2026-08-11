import type { FC } from "react";
import type { SparklinePoint } from "../types.ts";



interface NetWorthActivePointProps {
	active: SparklinePoint | null;
}

const NetWorthActivePoint: FC<NetWorthActivePointProps> = ({ active }) => (
	active ? (
		<>
			<div className="pointer-events-none absolute -top-[300px] -bottom-[300px] border-l border-dashed border-border-strong" style={{ left: `${active.xPct.toFixed(2)}%` }} />
			<span
				className="pointer-events-none absolute size-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--surface)] bg-[var(--primary)] shadow-[0_0_0_1px_var(--primary)]"
				style={{ left: `${active.xPct.toFixed(2)}%`, top: `${active.yPct.toFixed(2)}%` }}
			/>
		</>
	) : null
);

NetWorthActivePoint.displayName = 'NetWorthActivePoint';

export { NetWorthActivePoint };
export type { NetWorthActivePointProps };
