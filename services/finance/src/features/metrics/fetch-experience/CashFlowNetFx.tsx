import type { FC, ReactNode } from "react";
import type { CashFlowInsight } from "@feature/metrics";


interface CashFlowNetFxProps {
	isPending: boolean;
	isError: boolean;
	cashFlow: CashFlowInsight | undefined;
	children: (cashFlow: CashFlowInsight) => ReactNode;
}

const CashFlowNetFx: FC<CashFlowNetFxProps> = ({
	isPending,
	isError,
	cashFlow,
	children,
}) => {
	if (isPending) {
		return <CashFlowNetSkeleton />;
	} else if (isError || !cashFlow) {
		return <CashFlowNetFailed />;
	}

	return children(cashFlow);
};

const CashFlowNetSkeleton: FC = () => (
	<div className="mt-[18px] flex items-center justify-between border-t border-border pt-3.5 animate-pulse">
		<div className="h-4 w-24 rounded bg-secondary" />
		<div className="h-6 w-28 rounded bg-secondary" />
	</div>
);

const CashFlowNetFailed: FC = () => (
	<div className="mt-4 text-[13px] text-text-3">
		Couldn’t load cash flow.
	</div>
);

export { CashFlowNetFx };