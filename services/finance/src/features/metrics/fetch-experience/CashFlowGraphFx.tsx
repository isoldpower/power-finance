import type {FC, ReactNode} from "react";
import type { CashFlowInsight } from "@feature/metrics";


interface CashFlowGraphFxProps {
	isPending: boolean;
	isError: boolean;
	cashFlow: CashFlowInsight | undefined;
	children: (cashFlow: CashFlowInsight) => ReactNode;
}

const CashFlowGraphFx: FC<CashFlowGraphFxProps> = ({
	isPending,
	isError,
	cashFlow,
	children,
}) => {
	if (isPending) {
		return <CashFlowGraphSkeleton />;
	} else if (isError || !cashFlow) {
		return <CashFlowGraphFailed />;
	}

	return children(cashFlow);
};

const CashFlowGraphSkeleton: FC = () => (
	<div className="mt-[18px] h-2 rounded-full bg-secondary animate-pulse" />
);

const CashFlowGraphFailed: FC = () => (
	<div className="mt-4 text-[13px] text-text-3">
		Couldn’t load cash flow.
	</div>
);

export { CashFlowGraphFx };