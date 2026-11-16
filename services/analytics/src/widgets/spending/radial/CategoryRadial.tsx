import { ChartFrame } from "@shared/charts";
import { CategoryRadialPlot } from "./chart-partials/CategoryRadialPlot.tsx";

import type { FC } from "react";
import type { BreakdownChartProps } from "../types.ts";


interface CategoryRadialProps extends BreakdownChartProps {
	height?: number;
}

const CategoryRadial: FC<CategoryRadialProps> = ({ height = 280, ...props }) => (
	<ChartFrame height={height} label="Category share radial bars">
		{({ width }) => <CategoryRadialPlot width={width} height={height} {...props} />}
	</ChartFrame>
);

CategoryRadial.displayName = 'CategoryRadial';

export { CategoryRadial };
export type { CategoryRadialProps };
