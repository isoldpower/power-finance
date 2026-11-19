import { ChartMessage, ChartSkeleton } from "@shared/charts";
import { QueryFx } from "@shared/feedback";

import type { FC, ReactNode } from "react";
import type { MoneyFlow } from "@entity/flow";


interface MoneyFlowCardFxProps {
	isPending: boolean;
	isError: boolean;
	moneyFlow: MoneyFlow | undefined;
	height: number;
	children: (moneyFlow: MoneyFlow) => ReactNode;
}

const hasNoLinks = (moneyFlow: MoneyFlow): boolean => moneyFlow.links.length === 0;

const MoneyFlowCardFx: FC<MoneyFlowCardFxProps> = ({ isPending, isError, moneyFlow, height, children }) => (
	<QueryFx
		isPending={isPending}
		isError={isError}
		data={moneyFlow}
		pending={<ChartSkeleton height={height} />}
		error={<ChartMessage height={height} title="Couldn’t load the money flow" />}
		isEmpty={hasNoLinks}
		empty={(
			<ChartMessage
				height={height}
				title="No money moved"
				detail="Nothing matches the current filters"
			/>
		)}
	>
		{children}
	</QueryFx>
);

MoneyFlowCardFx.displayName = 'MoneyFlowCardFx';

export { MoneyFlowCardFx };
export type { MoneyFlowCardFxProps };
