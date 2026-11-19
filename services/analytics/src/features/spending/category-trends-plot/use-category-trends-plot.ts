import { useMemo } from "react";
import { scaleLinear } from "@visx/scale";
import { area } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { indexScale, innerSize, useIndexHover, useKeyedTransition } from "@shared/charts";
import { BAND_FIELDS, TRENDS_MARGIN } from "./config.ts";
import { layerBands } from "./plot-partials/layer-bands.ts";
import { rowTicks } from "./plot-partials/row-ticks.ts";
import { smoothTrend } from "./plot-partials/smooth-trend.ts";
import { streamMidpoints } from "./plot-partials/stream-midpoints.ts";
import { collapseToFloor, collapseToZero } from "./plot-partials/transitions.ts";
import { trendLines } from "./plot-partials/trend-lines.ts";
import { stackBounds, useStackedLayers } from "./plot-partials/use-stacked-layers.ts";
import { visibleTotals } from "./plot-partials/visible-totals.ts";

import type { Granularity } from "@entity/filters";
import type { TrendLayer, TrendRow, TrendsMode } from "@entity/spending";
import type { BandPoint } from "./plot-partials/layer-bands.ts";


interface CategoryTrendsPlotParams {
	rows: TrendRow[];
	layers: TrendLayer[];
	isVisible: (key: string) => boolean;
	mode: TrendsMode;
	granularity: Granularity;
	width: number;
	height: number;
}

const useCategoryTrendsPlot = ({
	rows,
	layers,
	isVisible,
	mode,
	granularity,
	width,
	height,
}: CategoryTrendsPlotParams) => {
	const { innerWidth, innerHeight } = innerSize(width, height, TRENDS_MARGIN);

	const visibleKeys = useMemo(() => {
		return layers.filter((layer) => isVisible(layer.key)).map((layer) => layer.key);
	}, [layers, isVisible]);
	const layout = useStackedLayers(rows, visibleKeys, mode);

	const layerOf = useMemo(() => {
		return new Map(layers.map((layer) => [layer.key, layer]));
	}, [layers]);
	const tooltipLayers = useMemo(() => {
		return layers.filter((layer) => visibleKeys.includes(layer.key)).reverse();
	}, [layers, visibleKeys]);
	const resetKey = useMemo(() => {
		const count = rows.length.toString();
		const firstStart = rows.at(0)?.start ?? '';

		return `${count}:${firstStart}:${granularity}`;
	}, [rows, granularity]);
	const { items: stacked } = useKeyedTransition(layout.layers, {
		fields: BAND_FIELDS,
		enter: collapseToFloor,
		introFrom: collapseToZero,
		resetKey,
	});
	const bounds = useMemo(() => {
		const edges = stacked.flatMap((layer) => layer.bands.flat());

		return stackBounds(edges);
	}, [stacked]);

	const xScale = useMemo(() => {
		return indexScale(rows.length, innerWidth);
	}, [rows.length, innerWidth]);
	const yScale = useMemo(() => {
		return scaleLinear<number>({
			domain: [bounds.min, bounds.max],
			range: [innerHeight, 0],
			nice: mode === 'stacked',
		});
	}, [bounds.min, bounds.max, innerHeight, mode]);
	const pathOf = useMemo(() => {
		return area<BandPoint>({
			x: (point) => xScale(point.index),
			y0: (point) => yScale(point.band[0]),
			y1: (point) => yScale(point.band[1]),
			curve: curveMonotoneX,
		});
	}, [xScale, yScale]);
	const trend = useMemo(() => {
		return smoothTrend(visibleTotals(rows, visibleKeys));
	}, [rows, visibleKeys]);
	const streamCenters = useMemo(() => {
		const streaming = mode === 'stream' && layout.layers.length > 0;

		return streaming ? smoothTrend(streamMidpoints(rows, layout.layers)) : null;
	}, [mode, layout.layers, rows]);
	const lineMarks = useMemo(() => {
		return trendLines(trend, streamCenters, mode, { x: xScale, y: yScale }).map((points, lineIndex) => ({
			key: `${resetKey}:${mode}:${lineIndex.toString()}`,
			points,
		}));
	}, [trend, streamCenters, mode, xScale, yScale, resetKey]);
	const bandMarks = useMemo(() => {
		return layerBands(stacked, layerOf).map(({ band, layer, points }) => ({
			key: band.key,
			layer,
			path: pathOf(points) ?? '',
		}));
	}, [stacked, layerOf, pathOf]);
	const positions = useMemo(() => {
		return rows.map((row) => xScale(row.index));
	}, [rows, xScale]);
	const ticks = useMemo(() => {
		return rowTicks(rows, innerWidth);
	}, [rows, innerWidth]);

	const hover = useIndexHover(positions, TRENDS_MARGIN.left);
	const hoveredRow = hover.index === null ? null : rows[hover.index];

	return {
		innerWidth,
		innerHeight,
		xScale,
		yScale,
		trend,
		lineMarks,
		bandMarks,
		positions,
		ticks,
		tooltipLayers,
		hover,
		hoveredRow,
	};
};

export { useCategoryTrendsPlot };
export type { CategoryTrendsPlotParams };
