import { useMemo } from "react";
import { scaleLinear } from "@visx/scale";
import { indexScale, innerSize, useIndexHover } from "@shared/charts";
import { FLOW_CHART_MARGIN, tickIndices } from "../plot-layout";
import { paceDomain } from "./plot-partials/pace-domain.ts";
import { toPaceLine } from "./plot-partials/pace-line.ts";

import type { PacePoint } from "@entity/flow";


const currentValueOf = (point: PacePoint): number | null => point.current;
const previousValueOf = (point: PacePoint): number | null => point.previous;

const useSpendingPacePlot = (points: PacePoint[], width: number, height: number) => {
	const { innerWidth, innerHeight } = innerSize(width, height, FLOW_CHART_MARGIN);

	const xScale = useMemo(() => {
		return indexScale(points.length, innerWidth);
	}, [points.length, innerWidth]);
	const yScale = useMemo(() => {
		return scaleLinear<number>({
			domain: paceDomain(points),
			range: [innerHeight, 0],
			nice: true,
		});
	}, [points, innerHeight]);
	const currentLine = useMemo(() => {
		return toPaceLine(points, currentValueOf, { x: xScale, y: yScale });
	}, [points, xScale, yScale]);
	const previousLine = useMemo(() => {
		return toPaceLine(points, previousValueOf, { x: xScale, y: yScale });
	}, [points, xScale, yScale]);
	const positions = useMemo(() => {
		return points.map((point) => xScale(point.index));
	}, [points, xScale]);
	const ticks = useMemo(() => {
		return tickIndices(points.length, innerWidth);
	}, [points.length, innerWidth]);

	const hover = useIndexHover(positions, FLOW_CHART_MARGIN.left);
	const hoveredPoint = hover.index === null ? null : points[hover.index];

	return {
		innerWidth,
		innerHeight,
		xScale,
		yScale,
		currentLine,
		previousLine,
		positions,
		ticks,
		hover,
		hoveredPoint,
	};
};

export { useSpendingPacePlot };
