import { ChartMessage, ChartSkeleton } from "@shared/charts";
import { QueryFx } from "@shared/feedback";

import type { FC, ReactNode } from "react";
import type { CashFlow } from "@entity/flow";


interface SurplusCardFxProps {
	isPending: boolean;
	isError: boolean;
	cashFlow: CashFlow | undefined;
	height: number;
	children: (cashFlow: CashFlow) => ReactNode;
}

const SurplusCardFx: FC<SurplusCardFxProps> = ({ isPending, isError, cashFlow, height, children }) => (
	<QueryFx
		isPending={isPending}
		isError={isError}
		data={cashFlow}
		pending={<ChartSkeleton height={height} />}
		error={<ChartMessage height={height} title="Couldn’t load the running totals" />}
	>
		{children}
	</QueryFx>
);

SurplusCardFx.displayName = 'SurplusCardFx';

export { SurplusCardFx };
export type { SurplusCardFxProps };
