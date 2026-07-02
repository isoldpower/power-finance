import type { FC } from "react";

const CashFlowNetSkeleton: FC = () => (
	<div className="mt-[18px] flex items-center justify-between border-t border-border pt-3.5 animate-pulse">
		<div className="h-4 w-24 rounded bg-secondary" />
		<div className="h-6 w-28 rounded bg-secondary" />
	</div>
);

CashFlowNetSkeleton.displayName = 'CashFlowNetSkeleton';

export { CashFlowNetSkeleton };
