import { ChartMessage, ChartSkeleton } from "@shared/charts";
import { QueryFx } from "@shared/feedback";

import type { FC, ReactNode } from "react";
import type { BalanceHistory } from "@entity/flow";


interface BalanceHistoryCardFxProps {
	isPending: boolean;
	isError: boolean;
	history: BalanceHistory | undefined;
	height: number;
	children: (history: BalanceHistory) => ReactNode;
}

const BRUSH_AND_LEGEND_HEIGHT = 64;

const BalanceHistoryCardFx: FC<BalanceHistoryCardFxProps> = ({ isPending, isError, history, height, children }) => {
	const skeletonHeight = height + BRUSH_AND_LEGEND_HEIGHT;

	return (
		<QueryFx
			isPending={isPending}
			isError={isError}
			data={history}
			pending={<ChartSkeleton height={skeletonHeight} />}
			error={<ChartMessage height={height} title="Couldn’t load balance history" />}
		>
			{children}
		</QueryFx>
	);
};

BalanceHistoryCardFx.displayName = 'BalanceHistoryCardFx';

export { BalanceHistoryCardFx };
export type { BalanceHistoryCardFxProps };
