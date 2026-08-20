import { cn } from "@internal/ui-library";
import { CashFlowBalanceSkeleton } from "./skeleton/CashFlowBalanceSkeleton.tsx";
import { CashFlowGraphSkeleton } from "./skeleton/CashFlowGraphSkeleton.tsx";
import { CashFlowNetSkeleton } from "./skeleton/CashFlowNetSkeleton.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type CashFlowSkeletonProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type CashFlowSkeletonObject = FC<CashFlowSkeletonProps> & {
	Balance: FC;
	Graph: FC;
	Net: FC;
}

const CashFlowSkeleton: CashFlowSkeletonObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"mt-[18px] animate-pulse"
		)}
		{...props}
	>
		{children}
	</div>
);

CashFlowSkeleton.Balance = CashFlowBalanceSkeleton;
CashFlowSkeleton.Graph = CashFlowGraphSkeleton;
CashFlowSkeleton.Net = CashFlowNetSkeleton;
CashFlowSkeleton.displayName = 'CashFlowSkeleton';

export { CashFlowSkeleton };
export type { CashFlowSkeletonProps };
