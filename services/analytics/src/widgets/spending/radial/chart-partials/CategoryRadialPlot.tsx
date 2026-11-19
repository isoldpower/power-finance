import { Group } from "@visx/group";
import { RadialBar } from "@entity/spending";
import { ShowOnPresent } from "@feature/interactions";
import { useCategoryRadialPlot } from "@feature/spending";
import { formatPercent } from "@shared/formatting";
import { RadialCenterContent } from "./plot-partials/RadialCenterContent.tsx";

import type { FC } from "react";
import type { BreakdownChartProps } from "../../types.ts";


interface CategoryRadialPlotProps extends BreakdownChartProps {
	width: number;
	height: number;
}

const CategoryRadialPlot: FC<CategoryRadialPlotProps> = ({
	slices,
	currency,
	colorOf,
	focused,
	onFocus,
	onSelect,
	width,
	height,
}) => {
	const { rings, activeSlice } = useCategoryRadialPlot({ slices, focused, width, height });

	return (
		<svg width={width} height={height}>
			<Group top={height / 2} left={width / 2}>
				{rings.map(({ slice, innerRadius, outerRadius, endAngle }) => (
					<RadialBar
						key={slice.key}
						innerRadius={innerRadius}
						outerRadius={outerRadius}
						endAngle={endAngle}
						color={colorOf(slice.key)}
						dimmed={focused !== null && focused !== slice.key}
						label={`${slice.label}: ${formatPercent(slice.share)}`}
						onHover={(hovered) => { onFocus(hovered ? slice.key : null); }}
						onSelect={() => { onSelect(slice); }}
					/>
				))}
				<ShowOnPresent value={activeSlice}>
					{(slice) => <RadialCenterContent slice={slice} currency={currency} />}
				</ShowOnPresent>
			</Group>
		</svg>
	);
};

CategoryRadialPlot.displayName = 'CategoryRadialPlot';

export { CategoryRadialPlot };
export type { CategoryRadialPlotProps };
