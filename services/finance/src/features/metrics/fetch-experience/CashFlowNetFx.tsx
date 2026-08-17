import type { FC, ReactNode } from "react";
import type { CashFlow } from "@entity/metrics";

import { CashFlowSkeleton } from "@entity/metrics";
import { Caption } from "@shared/pure-components/typography";


interface CashFlowNetFxProps {
	isPending: boolean;
	isError: boolean;
	cashFlow: CashFlow | undefined;
	children: (cashFlow: CashFlow) => ReactNode;
}

const CashFlowNetFx: FC<CashFlowNetFxProps> = ({
	isPending,
	isError,
	cashFlow,
	children,
}) => {
	if (isPending) {
		return (
			<CashFlowSkeleton>
				<CashFlowSkeleton.Net />
			</CashFlowSkeleton>
		);
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