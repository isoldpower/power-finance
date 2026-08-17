import { CashFlowSkeleton } from "@entity/metrics";
import { Caption } from "@shared/pure-components/typography";

import type { FC, ReactNode } from "react";
import type { CashFlow } from "@entity/metrics";


interface CashFlowGraphFxProps {
	isPending: boolean;
	isError: boolean;
	cashFlow: CashFlow | undefined;
	children: (cashFlow: CashFlow) => ReactNode;
}

const CashFlowGraphFx: FC<CashFlowGraphFxProps> = ({
	isPending,
	isError,
	cashFlow,
	children,
}) => {
	if (isPending) {
		return (
			<CashFlowSkeleton>
				<CashFlowSkeleton.Graph />
			</CashFlowSkeleton>
		);
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