import { ChartFrame } from "@shared/charts";
import { CategoryDonutPlot } from "./chart-partials/CategoryDonutPlot.tsx";

import type { FC } from "react";
import type { BreakdownChartProps } from "../types.ts";


interface CategoryDonutProps extends BreakdownChartProps {
	totalLabel: string;
	total: number;
	categoryCount: number;
	height?: number;
}

const CategoryDonut: FC<CategoryDonutProps> = ({ height = 280, ...props }) => (
	<ChartFrame height={height} label="Category share donut chart">
		{({ width }) => <CategoryDonutPlot width={width} height={height} {...props} />}
	</ChartFrame>
);

CategoryDonut.displayName = 'CategoryDonut';

export { CategoryDonut };
export type { CategoryDonutProps };
