import type {FC, ReactNode} from "react";
import type { CashFlowInsight } from "@feature/metrics";

import { CashFlowGraphSkeleton } from "@entity/metrics";


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

const CashFlowGraphFailed: FC = () => (
	<div className="mt-4 text-[13px] text-text-3">
		Couldn’t load cash flow.
	</div>
);

export { CashFlowGraphFx };