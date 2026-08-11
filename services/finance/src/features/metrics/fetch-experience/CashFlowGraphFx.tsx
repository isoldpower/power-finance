import type {FC, ReactNode} from "react";
import type { CashFlowInsight } from "../metrics-api/types.ts";

import { CashFlowGraphSkeleton } from "@entity/metrics";
import { Caption } from "@shared/pure-components/typography";


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
	<Caption size="13" className="mt-4">
		Couldn’t load cash flow.
	</Caption>
);

export { CashFlowGraphFx };