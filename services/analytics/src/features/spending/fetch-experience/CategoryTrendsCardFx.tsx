import { ChartMessage, ChartSkeleton } from "@shared/charts";
import { QueryFx } from "@shared/feedback";

import type { FC, ReactNode } from "react";
import type { CategoryTrends } from "@entity/spending";


interface CategoryTrendsCardFxProps {
	isPending: boolean;
	isError: boolean;
	trends: CategoryTrends | undefined;
	height: number;
	children: (trends: CategoryTrends) => ReactNode;
}

const hasNoSeries = (trends: CategoryTrends): boolean => trends.series.length === 0;

const CategoryTrendsCardFx: FC<CategoryTrendsCardFxProps> = ({ isPending, isError, trends, height, children }) => (
	<QueryFx
		isPending={isPending}
		isError={isError}
		data={trends}
		pending={<ChartSkeleton height={height} />}
		error={<ChartMessage height={height} title="Couldn’t load category trends" />}
		isEmpty={hasNoSeries}
		empty={(
			<ChartMessage
				height={height}
				title="Nothing to chart"
				detail="No transactions match the current filters"
			/>
		)}
	>
		{children}
	</QueryFx>
);

CategoryTrendsCardFx.displayName = 'CategoryTrendsCardFx';

export { CategoryTrendsCardFx };
export type { CategoryTrendsCardFxProps };
