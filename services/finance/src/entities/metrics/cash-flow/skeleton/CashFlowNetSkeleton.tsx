import { cn } from "@internal/ui-library";

import type { FC } from "react";


const CashFlowNetSkeleton: FC = () => (
	<div
		className={cn(
			"flex items-center justify-between border-t border-border pt-3.5"
		)}
	>
		<div className="h-4 w-24 rounded bg-secondary" />
		<div className="h-6 w-28 rounded bg-secondary" />
	</div>
);

CashFlowNetSkeleton.displayName = 'CashFlowNetSkeleton';

export { CashFlowNetSkeleton };
