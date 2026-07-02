import type { FC } from "react";

const CashFlowGraphSkeleton: FC = () => (
	<div className="mt-[18px] h-2 rounded-full bg-secondary animate-pulse" />
);

CashFlowGraphSkeleton.displayName = 'CashFlowGraphSkeleton';

export { CashFlowGraphSkeleton };
