import { useMemo } from "react";
import { scaleLinear } from "@visx/scale";
import { indexScale, innerSize, useIndexHover } from "@shared/charts";
import { FLOW_CHART_MARGIN, tickIndices } from "../plot-layout";
import { balanceDomain } from "./plot-partials/balance-domain.ts";

import type { CashFlowPoint } from "@entity/flow";


const useBalanceAreaPlot = (points: CashFlowPoint[], width: number, height: number) => {
	const { innerWidth, innerHeight } = innerSize(width, height, FLOW_CHART_MARGIN);

	const xScale = useMemo(() => {
		return indexScale(points.length, innerWidth);
	}, [points.length, innerWidth]);
	const yScale = useMemo(() => {
		return scaleLinear<number>({ domain: balanceDomain(points), range: [innerHeight, 0], nice: true });
	}, [points, innerHeight]);
	const positions = useMemo(() => {
		return points.map((_, index) => xScale(index));
	}, [points, xScale]);
	const linePoints = useMemo(() => {
		return points.map((point, index) => ({ x: positions[index], y: yScale(point.balance) }));
	}, [points, positions, yScale]);
	const ticks = useMemo(() => {
		return tickIndices(points.length, innerWidth);
	}, [points.length, innerWidth]);

	const hover = useIndexHover(positions, FLOW_CHART_MARGIN.left);
	const hoveredPoint = hover.index === null ? null : points[hover.index];

	return { innerWidth, innerHeight, xScale, yScale, positions, linePoints, ticks, hover, hoveredPoint };
};

export { useBalanceAreaPlot };
