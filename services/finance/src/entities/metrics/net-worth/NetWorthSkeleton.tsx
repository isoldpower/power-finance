import { cn } from "@internal/ui-library";
import { NetWorthSkeletonAmount } from "./skeleton/NetWorthSkeletonAmount.tsx";
import { NetWorthSkeletonDescriptor } from "./skeleton/NetWorthSkeletonDescriptor.tsx";
import { NetWorthSkeletonGraph } from "./skeleton/NetWorthSkeletonGraph.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type NetWorthSkeletonProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type NetWorthSkeletonObject = FC<NetWorthSkeletonProps> & {
	Amount: FC;
	Descriptor: FC;
	Graph: FC;
}

const NetWorthSkeleton: NetWorthSkeletonObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"animate-pulse"
		)}
		{...props}
	>
		{children}
	</div>
);

NetWorthSkeleton.Amount = NetWorthSkeletonAmount;
NetWorthSkeleton.Descriptor = NetWorthSkeletonDescriptor;
NetWorthSkeleton.Graph = NetWorthSkeletonGraph;
NetWorthSkeleton.displayName = 'NetWorthSkeleton';

export { NetWorthSkeleton };
export type { NetWorthSkeletonProps };
