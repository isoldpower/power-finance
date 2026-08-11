import type { FC, ReactNode } from "react";
import type { CashFlowInsight } from "../metrics-api/types.ts";

import { CashFlowNetSkeleton } from "@entity/metrics";
import { Caption } from "@shared/pure-components/typography";


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
	<Caption size="13" className="mt-4">
		Couldn’t load cash flow.
	</Caption>
);

export { CashFlowNetFx };