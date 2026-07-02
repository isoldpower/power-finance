import type { FC, ReactNode } from "react";
import type { CashFlowInsight } from "@feature/metrics";

import { CashFlowBalanceSkeleton } from "@entity/metrics";


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

const CashFlowBalanceFailed: FC = () => (
	<div className="mt-4 text-[13px] text-text-3">
		Couldn’t load cash flow.
	</div>
);

export { CashFlowBalanceFx };