import { ChartMessage, ChartSkeleton } from "@shared/charts";
import { QueryFx } from "@shared/feedback";

import type { FC, ReactNode } from "react";
import type { CategoryBreakdown } from "@entity/spending";


interface CategoryBreakdownCardFxProps {
	isPending: boolean;
	isError: boolean;
	breakdown: CategoryBreakdown | undefined;
	height: number;
	children: (breakdown: CategoryBreakdown) => ReactNode;
}

const hasNoCategories = (breakdown: CategoryBreakdown): boolean => breakdown.categories.length === 0;

const CategoryBreakdownCardFx: FC<CategoryBreakdownCardFxProps> = ({ isPending, isError, breakdown, height, children }) => (
	<QueryFx
		isPending={isPending}
		isError={isError}
		data={breakdown}
		pending={<ChartSkeleton height={height} />}
		error={<ChartMessage height={height} title="Couldn’t load categories" />}
		isEmpty={hasNoCategories}
		empty={(
			<ChartMessage
				height={height}
				title="Nothing here yet"
				detail="No transactions match the current filters"
			/>
		)}
	>
		{children}
	</QueryFx>
);

CategoryBreakdownCardFx.displayName = 'CategoryBreakdownCardFx';

export { CategoryBreakdownCardFx };
export type { CategoryBreakdownCardFxProps };
