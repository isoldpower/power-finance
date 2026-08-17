import type { FC } from "react";


const CashFlowBalanceSkeleton: FC = () => (
	<div className="flex flex-1 flex-col">
		<div className="grid grid-cols-2 gap-3.5">
			<div className="h-[42px] rounded-[var(--radius-md)] bg-secondary" />
			<div className="h-[42px] rounded-[var(--radius-md)] bg-secondary" />
		</div>
	</div>
);

CashFlowBalanceSkeleton.displayName = 'CashFlowBalanceSkeleton';

export { CashFlowBalanceSkeleton };
