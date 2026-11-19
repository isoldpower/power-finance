import { ChartMessage, ChartSkeleton } from "@shared/charts";
import { QueryFx } from "@shared/feedback";

import type { FC, ReactNode } from "react";
import type { SpendingRhythm } from "@entity/spending";


interface RhythmCardFxProps {
	isPending: boolean;
	isError: boolean;
	rhythm: SpendingRhythm | undefined;
	children: (rhythm: SpendingRhythm) => ReactNode;
}

const PLACEHOLDER_HEIGHT = 200;

const RhythmCardFx: FC<RhythmCardFxProps> = ({ isPending, isError, rhythm, children }) => (
	<QueryFx
		isPending={isPending}
		isError={isError}
		data={rhythm}
		pending={<ChartSkeleton height={PLACEHOLDER_HEIGHT} />}
		error={<ChartMessage height={PLACEHOLDER_HEIGHT} title="Couldn’t load the weekly rhythm" />}
	>
		{children}
	</QueryFx>
);

RhythmCardFx.displayName = 'RhythmCardFx';

export { RhythmCardFx };
export type { RhythmCardFxProps };
