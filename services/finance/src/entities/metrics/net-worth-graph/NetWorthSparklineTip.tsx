import { VIEW_H } from "@shared/utils";
import { cn } from "@internal/ui-library";

import type { FC } from "react";
import type { SparklinePoint } from "../types";


interface NetWorthSparklineTipProps {
	lastY: number;
	active: SparklinePoint | null;
}

const NetWorthSparklineTip: FC<NetWorthSparklineTipProps> = ({ lastY, active }) => (
	!active ? (
		<span
			className={cn(
				"fx-fade [animation-delay:1.5s] pointer-events-none",
				"absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full",
				"border-2 border-[var(--surface)] bg-[var(--primary)]"
			)}
			style={{ left: 'calc(100%)', top: `${((lastY / VIEW_H) * 100).toFixed(2)}%` }}
		/>
	) : null
);

NetWorthSparklineTip.displayName = 'NetWorthSparklineTip';

export { NetWorthSparklineTip };
export type { NetWorthSparklineTipProps };
