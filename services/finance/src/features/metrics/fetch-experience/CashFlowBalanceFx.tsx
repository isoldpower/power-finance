import type { FC, ReactNode } from "react";
import type { CashFlowInsight } from "../metrics-api/types.ts";

import { CashFlowBalanceSkeleton } from "@entity/metrics";
import { Caption } from "@shared/pure-components/typography";


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
	<Caption size="13" className="mt-4">
		Couldn’t load cash flow.
	</Caption>
);

export { CashFlowBalanceFx };