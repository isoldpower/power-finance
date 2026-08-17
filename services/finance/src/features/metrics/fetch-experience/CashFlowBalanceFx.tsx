import type { FC, ReactNode } from "react";
import type { CashFlow } from "@entity/metrics";

import { CashFlowSkeleton } from "@entity/metrics";
import { Caption } from "@shared/pure-components/typography";


interface CashFlowBalanceFxProps {
	isPending: boolean;
	isError: boolean;
	cashFlow: CashFlow | undefined;
	children: (cashFlow: CashFlow) => ReactNode;
}

const CashFlowBalanceFx: FC<CashFlowBalanceFxProps> = ({
	isPending,
	isError,
	cashFlow,
	children,
}) => {
	if (isPending) {
		return (
			<CashFlowSkeleton>
				<CashFlowSkeleton.Balance />
			</CashFlowSkeleton>
		);
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