import { ChartMessage, ChartSkeleton } from "@shared/charts";
import { QueryFx } from "@shared/feedback";

import type { FC, ReactNode } from "react";
import type { CashFlow } from "@entity/flow";


interface CashFlowCardFxProps {
	isPending: boolean;
	isError: boolean;
	cashFlow: CashFlow | undefined;
	height: number;
	children: (cashFlow: CashFlow) => ReactNode;
}

const TOTALS_HEIGHT = 56;

const CashFlowCardFx: FC<CashFlowCardFxProps> = ({ isPending, isError, cashFlow, height, children }) => {
	const skeletonHeight = height + TOTALS_HEIGHT;

	return (
		<QueryFx
			isPending={isPending}
			isError={isError}
			data={cashFlow}
			pending={<ChartSkeleton height={skeletonHeight} />}
			error={<ChartMessage height={height} title="Couldn’t load cash flow" />}
		>
			{children}
		</QueryFx>
	);
};

CashFlowCardFx.displayName = 'CashFlowCardFx';

export { CashFlowCardFx };
export type { CashFlowCardFxProps };
