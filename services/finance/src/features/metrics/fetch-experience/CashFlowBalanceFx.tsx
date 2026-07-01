import type { FC, ReactNode } from "react";
import type { CashFlowInsight } from "@feature/metrics";


interface CashFlowBalanceFxProps {
	isPending: boolean;
	isError: boolean;
	cashFlow: CashFlowInsight | undefined;
	children: (cashFlow: CashFlowInsight) => ReactNode;
}

const CashFlowBalanceFx: FC<CashFlowBalanceFxProps> = ({
	isPending,
	isError,
	cashFlow,
	children,
}) => {
	if (isPending) {
		return <CashFlowBalanceSkeleton />;
	} else if (isError || !cashFlow) {
		return <CashFlowBalanceFailed />;
	}

	return children(cashFlow);
};

const CashFlowBalanceSkeleton: FC = () => (
	<div className="mt-[18px] flex flex-1 flex-col animate-pulse">
		<div className="grid grid-cols-2 gap-3.5">
			<div className="h-[42px] rounded-[var(--radius-md)] bg-secondary" />
			<div className="h-[42px] rounded-[var(--radius-md)] bg-secondary" />
		</div>
	</div>
);

const CashFlowBalanceFailed: FC = () => (
	<div className="mt-4 text-[13px] text-text-3">
		Couldn’t load cash flow.
	</div>
);

export { CashFlowBalanceFx };