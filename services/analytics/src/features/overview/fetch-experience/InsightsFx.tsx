import { ChartMessage } from "@shared/charts";
import { QueryFx } from "@shared/feedback";
import { InsightsListSkeleton } from "./fx-partials/InsightsListSkeleton.tsx";

import type { FC, ReactNode } from "react";
import type { InsightSources } from "../insights";


interface InsightsFxProps {
	isPending: boolean;
	isError: boolean;
	sources: InsightSources | undefined;
	children: (sources: InsightSources) => ReactNode;
}

const ERROR_HEIGHT = 80;

const InsightsFx: FC<InsightsFxProps> = ({ isPending, isError, sources, children }) => (
	<QueryFx
		isPending={isPending}
		isError={isError}
		data={sources}
		pending={<InsightsListSkeleton />}
		error={<ChartMessage height={ERROR_HEIGHT} title="Couldn’t build insights" />}
	>
		{children}
	</QueryFx>
);

InsightsFx.displayName = 'InsightsFx';

export { InsightsFx };
export type { InsightsFxProps };
