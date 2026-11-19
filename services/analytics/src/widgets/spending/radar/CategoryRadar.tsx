import { ProtectFewRadarAxes } from "@feature/spending";
import { ChartFrame, ChartLegend, ACCENT_COLOR, MUTED_INK, ChartMessage } from "@shared/charts";
import { CategoryRadarPlot } from "./chart-partials/CategoryRadarPlot.tsx";

import type { FC } from "react";
import type { BreakdownChartProps } from "../types.ts";


interface CategoryRadarProps extends BreakdownChartProps {
	height?: number;
}

const CategoryRadar: FC<CategoryRadarProps> = ({ height = 280, ...props }) => (
	<ProtectFewRadarAxes
		axes={props.slices.length}
		fallback={(
			<ChartMessage
				height={height}
				title="Not enough categories"
				detail="A radar needs at least three categories"
			/>
		)}
	>
		<div className="relative">
			<ChartFrame height={height} label="Category radar compared with the previous period">
				{({ width }) => <CategoryRadarPlot width={width} height={height} {...props} />}
			</ChartFrame>
			<div className="pointer-events-none absolute left-0 top-0">
				<ChartLegend label="Radar legend">
					<ChartLegend.Item color={ACCENT_COLOR} label="This period" />
					<ChartLegend.Item color={MUTED_INK} label="Previous period" />
				</ChartLegend>
			</div>
		</div>
	</ProtectFewRadarAxes>
);

CategoryRadar.displayName = 'CategoryRadar';

export { CategoryRadar };
export type { CategoryRadarProps };
