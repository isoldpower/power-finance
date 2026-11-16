import { Group } from "@visx/group";
import { Pie } from "@visx/shape";
import { DonutSlice } from "@entity/spending";
import { outwardOffset, useCategoryDonutPlot } from "@feature/spending";
import { formatPercent } from "@shared/formatting";
import { CORNER_RADIUS, PAD_ANGLE } from "./config.ts";
import { DonutCenterContent } from "./plot-partials/DonutCenterContent.tsx";

import type { FC } from "react";
import type { BreakdownSlice } from "@entity/spending";
import type { BreakdownChartProps } from "../../types.ts";


interface CategoryDonutPlotProps extends BreakdownChartProps {
	width: number;
	height: number;
	totalLabel: string;
	total: number;
	categoryCount: number;
}

const CategoryDonutPlot: FC<CategoryDonutPlotProps> = ({
	slices,
	currency,
	colorOf,
	focused,
	onFocus,
	onSelect,
	width,
	height,
	totalLabel,
	total,
	categoryCount,
}) => {
	const { radius, innerRadius, sweep, shownSlices, shownTotal, activeSlice } = useCategoryDonutPlot({
		slices,
		total,
		focused,
		width,
		height,
	});

	return (
		<svg width={width} height={height}>
			<Group top={height / 2} left={width / 2}>
				<Pie<BreakdownSlice>
					data={shownSlices}
					pieValue={(slice) => slice.value}
					pieSort={null}
					endAngle={sweep}
					outerRadius={radius}
					innerRadius={innerRadius}
					padAngle={PAD_ANGLE}
					cornerRadius={CORNER_RADIUS}
				>
					{(pie) => pie.arcs.map((arc) => (
						<DonutSlice
							key={arc.data.key}
							path={pie.path(arc) ?? ''}
							offset={outwardOffset(pie.path.centroid(arc))}
							color={colorOf(arc.data.key)}
							active={arc.data.key === focused}
							dimmed={focused !== null && arc.data.key !== focused}
							label={`${arc.data.label}: ${formatPercent(arc.data.share)}`}
							onHover={(hovered) => { onFocus(hovered ? arc.data.key : null); }}
							onSelect={() => { onSelect(arc.data); }}
						/>
					))}
				</Pie>
				<DonutCenterContent
					active={activeSlice}
					totalLabel={totalLabel}
					total={shownTotal}
					categoryCount={categoryCount}
					currency={currency}
				/>
			</Group>
		</svg>
	);
};

CategoryDonutPlot.displayName = 'CategoryDonutPlot';

export { CategoryDonutPlot };
export type { CategoryDonutPlotProps };
