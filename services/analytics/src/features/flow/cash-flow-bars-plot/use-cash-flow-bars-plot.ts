import { useMemo } from "react";
import { scaleBand, scaleLinear } from "@visx/scale";
import { innerSize, useIndexHover } from "@shared/charts";
import { FLOW_CHART_MARGIN, tickIndices } from "../plot-layout";
import { cashFlowDomain } from "./plot-partials/cash-flow-domain.ts";
import { BUCKET_PADDING, SIDE_PADDING, SIDES } from "./config.ts";
import { toFlowBars } from "./plot-partials/flow-bars.ts";

import type { CashFlowPoint } from "@entity/flow";


const useCashFlowBarsPlot = (points: CashFlowPoint[], width: number, height: number) => {
	const { innerWidth, innerHeight } = innerSize(width, height, FLOW_CHART_MARGIN);

	const bucketScale = useMemo(() => {
		const indices = points.map((_, index) => index);

		return scaleBand<number>({
			domain: indices,
			range: [0, innerWidth],
			padding: BUCKET_PADDING,
		});
	}, [points, innerWidth]);
	const sideScale = useMemo(() => {
		return scaleBand({
			domain: SIDES,
			range: [0, bucketScale.bandwidth()],
			padding: SIDE_PADDING,
		});
	}, [bucketScale]);
	const amountScale = useMemo(() => {
		return scaleLinear<number>({
			domain: cashFlowDomain(points),
			range: [innerHeight, 0],
			nice: true,
		});
	}, [points, innerHeight]);
	const bucketStarts = useMemo(() => {
		return points.map((_, index) => bucketScale(index) ?? 0);
	}, [points, bucketScale]);
	const centers = useMemo(() => {
		const halfBucket = bucketScale.bandwidth() / 2;

		return bucketStarts.map((bucketStart) => bucketStart + halfBucket);
	}, [bucketStarts, bucketScale]);
	const bars = useMemo(() => {
		return toFlowBars(points, {
			bucket: bucketScale,
			side: sideScale,
			amount: amountScale,
		});
	}, [points, bucketScale, sideScale, amountScale]);
	const netPoints = useMemo(() => {
		return points.map((point, index) => ({
			x: centers[index],
			y: amountScale(point.net),
		}));
	}, [points, centers, amountScale]);
	const ticks = useMemo(() => {
		return tickIndices(points.length, innerWidth);
	}, [points.length, innerWidth]);

	const hover = useIndexHover(centers, FLOW_CHART_MARGIN.left);
	const hoveredPoint = hover.index === null ? null : points[hover.index];

	return {
		innerWidth,
		innerHeight,
		bucketScale,
		bucketWidth: bucketScale.bandwidth(),
		amountScale,
		bucketStarts,
		centers,
		bars,
		netPoints,
		ticks,
		hover,
		hoveredPoint,
	};
};

export { useCashFlowBarsPlot };
