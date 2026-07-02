import type { FC, ReactNode } from "react";
import type { CashFlowInsight } from "@feature/metrics";

import { CashFlowNetSkeleton } from "@entity/metrics";


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

const CashFlowNetFailed: FC = () => (
	<div className="mt-4 text-[13px] text-text-3">
		Couldn’t load cash flow.
	</div>
);

export { CashFlowNetFx };