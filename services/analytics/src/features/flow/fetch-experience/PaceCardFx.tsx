import { ChartMessage, ChartSkeleton } from "@shared/charts";
import { QueryFx } from "@shared/feedback";

import type { FC, ReactNode } from "react";
import type { SpendingPace } from "../spending-pace";


interface PaceCardFxProps {
	isPending: boolean;
	isError: boolean;
	pace: SpendingPace | undefined;
	height: number;
	children: (pace: SpendingPace) => ReactNode;
}

const PaceCardFx: FC<PaceCardFxProps> = ({ isPending, isError, pace, height, children }) => (
	<QueryFx
		isPending={isPending}
		isError={isError}
		data={pace}
		pending={<ChartSkeleton height={height} />}
		error={<ChartMessage height={height} title="Couldn’t load spending pace" />}
	>
		{children}
	</QueryFx>
);

PaceCardFx.displayName = 'PaceCardFx';

export { PaceCardFx };
export type { PaceCardFxProps };
