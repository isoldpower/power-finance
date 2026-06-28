import type { FC } from "react";

const CashFlowSkeleton: FC = () => (
	<div className="mt-[18px] flex flex-1 flex-col animate-pulse">
		<div className="grid grid-cols-2 gap-3.5">
			<div className="h-[42px] rounded-[var(--radius-md)] bg-secondary" />
			<div className="h-[42px] rounded-[var(--radius-md)] bg-secondary" />
		</div>
		<div className="mt-[18px] h-2 rounded-full bg-secondary" />
		<div className="flex-1" />
		<div className="mt-[18px] flex items-center justify-between border-t border-border pt-3.5">
			<div className="h-4 w-24 rounded bg-secondary" />
			<div className="h-6 w-28 rounded bg-secondary" />
		</div>
	</div>
);

CashFlowSkeleton.displayName = 'CashFlowSkeleton';

export { CashFlowSkeleton };
