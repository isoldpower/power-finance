import { useMemo } from "react";
import { scaleLinear } from "@visx/scale";
import { indexScale, innerSize, useIndexHover, useTween } from "@shared/charts";
import { FLOW_CHART_MARGIN, tickIndices } from "../plot-layout";
import { surplusDomain } from "./plot-partials/surplus-domain.ts";
import { toSurplusLines } from "./plot-partials/surplus-lines.ts";

import type { Granularity } from "@entity/filters";
import type { CumulativePoint } from "@entity/flow";


const useSurplusPlot = (points: CumulativePoint[], granularity: Granularity, width: number, height: number) => {
	const { innerWidth, innerHeight } = innerSize(width, height, FLOW_CHART_MARGIN);

	const resetKey = useMemo(() => {
		const count = points.length.toString();
		const firstStart = points.at(0)?.start ?? '';

		return `${count}:${firstStart}:${granularity}`;
	}, [points, granularity]);
	const target = useMemo(() => {
		const inflowTarget = points.map((point) => point.inflow);
		const outflowTarget = points.map((point) => point.outflow);

		return [inflowTarget, outflowTarget];
	}, [points]);
	const [inflows, outflows] = useTween(target, { resetKey }).value;

	const xScale = useMemo(() => {
		return indexScale(points.length, innerWidth);
	}, [points.length, innerWidth]);
	const yScale = useMemo(() => {
		return scaleLinear<number>({
			domain: surplusDomain(inflows, outflows),
			range: [innerHeight, 0],
			nice: true,
		});
	}, [inflows, outflows, innerHeight]);
	const positions = useMemo(() => {
		return points.map((_, index) => xScale(index));
	}, [points, xScale]);
	const { inflowLine, outflowLine, thresholdPoints } = useMemo(() => {
		return toSurplusLines(inflows, outflows, positions, yScale);
	}, [inflows, outflows, positions, yScale]);
	const ticks = useMemo(() => {
		return tickIndices(points.length, innerWidth);
	}, [points.length, innerWidth]);

	const hover = useIndexHover(positions, FLOW_CHART_MARGIN.left);
	const hoveredPoint = hover.index === null ? null : points[hover.index];

	return {
		innerWidth,
		innerHeight,
		resetKey,
		xScale,
		yScale,
		positions,
		inflowLine,
		outflowLine,
		thresholdPoints,
		ticks,
		hover,
		hoveredPoint,
	};
};

export { useSurplusPlot };
