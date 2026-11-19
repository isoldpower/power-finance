import { Group } from "@visx/group";
import { RadarAxisLabel, RadarGrid, RadarShape } from "@entity/spending";
import { useCategoryRadarPlot } from "@feature/spending";
import { ACCENT_COLOR, MUTED_INK } from "@shared/charts";

import type { FC } from "react";
import type { BreakdownChartProps } from "../../types.ts";


interface CategoryRadarPlotProps extends BreakdownChartProps {
	width: number;
	height: number;
}

const CategoryRadarPlot: FC<CategoryRadarPlotProps> = ({
	slices,
	colorOf,
	focused,
	onFocus,
	onSelect,
	width,
	height,
}) => {
	const { shownSlices, layout } = useCategoryRadarPlot(slices, width, height);

	return (
		<svg width={width} height={height}>
			<Group top={height / 2} left={width / 2}>
				<RadarGrid rings={layout.rings} spokes={layout.spokes} />
				<RadarShape points={layout.previous} color={MUTED_INK} dashed filled={false} />
				<RadarShape points={layout.current} color={ACCENT_COLOR} />
				{shownSlices.map((slice, index) => (
					<RadarAxisLabel
						key={slice.key}
						x={layout.labels[index].x}
						y={layout.labels[index].y}
						label={slice.label}
						color={colorOf(slice.key)}
						active={slice.key === focused}
						onHover={(hovered) => { onFocus(hovered ? slice.key : null); }}
						onSelect={() => { onSelect(slice); }}
					/>
				))}
			</Group>
		</svg>
	);
};

CategoryRadarPlot.displayName = 'CategoryRadarPlot';

export { CategoryRadarPlot };
export type { CategoryRadarPlotProps };
