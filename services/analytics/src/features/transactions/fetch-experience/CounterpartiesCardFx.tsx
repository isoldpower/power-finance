import { ChartMessage, ChartSkeleton } from "@shared/charts";
import { QueryFx } from "@shared/feedback";

import type { FC, ReactNode } from "react";
import type { CounterpartyRanking } from "@entity/transactions";


interface CounterpartiesCardFxProps {
	isPending: boolean;
	isError: boolean;
	ranking: CounterpartyRanking | undefined;
	height: number;
	children: (ranking: CounterpartyRanking) => ReactNode;
}

const SKELETON_BARS = 10;

const hasNoCounterparties = (ranking: CounterpartyRanking): boolean => ranking.counterparties.length === 0;

const CounterpartiesCardFx: FC<CounterpartiesCardFxProps> = ({ isPending, isError, ranking, height, children }) => (
	<QueryFx
		isPending={isPending}
		isError={isError}
		data={ranking}
		pending={<ChartSkeleton height={height} bars={SKELETON_BARS} />}
		error={<ChartMessage height={height} title="Couldn’t load counterparties" />}
		isEmpty={hasNoCounterparties}
		empty={<ChartMessage height={height} title="No counterparties yet" />}
	>
		{children}
	</QueryFx>
);

CounterpartiesCardFx.displayName = 'CounterpartiesCardFx';

export { CounterpartiesCardFx };
export type { CounterpartiesCardFxProps };
