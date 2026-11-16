import { useMemo } from "react";
import { scaleLinear } from "@visx/scale";
import { innerSize, useIndexHover, useKeyedTransition } from "@shared/charts";
import { keepShape, toBalanceLines } from "./plot-partials/balance-lines.ts";
import { HISTORY_MARGIN, LINE_FIELDS } from "./config.ts";
import { domainTicks } from "./plot-partials/domain-ticks.ts";
import { historyDomain } from "./plot-partials/history-domain.ts";
import { indexInDomain } from "./plot-partials/index-in-domain.ts";

import type { BalanceHistoryView } from "@entity/flow";


interface BalanceHistoryPlotParams {
	view: BalanceHistoryView;
	domain: [number, number];
	width: number;
	height: number;
	showTotal: boolean;
	isVisible: (key: string) => boolean;
}

const useBalanceHistoryPlot = ({ view, domain, width, height, showTotal, isVisible }: BalanceHistoryPlotParams) => {
	const { innerWidth, innerHeight } = innerSize(width, height, HISTORY_MARGIN);

	const visibleWallets = useMemo(() => {
		return view.wallets.filter((series) => isVisible(series.key));
	}, [view.wallets, isVisible]);
	const lines = useMemo(() => {
		return toBalanceLines(view, visibleWallets, showTotal);
	}, [view, visibleWallets, showTotal]);
	const resetKey = useMemo(() => {
		const count = view.timestamps.length.toString();
		const firstTimestamp = view.timestamps.at(0) ?? '';

		return `${count}:${firstTimestamp}`;
	}, [view.timestamps]);
	const { items: shownLines } = useKeyedTransition(lines, {
		fields: LINE_FIELDS,
		enter: keepShape,
		intro: 'none',
		resetKey,
	});

	const xScale = useMemo(() => {
		return scaleLinear<number>({
			domain,
			range: [0, innerWidth],
		});
	}, [domain, innerWidth]);
	const yScale = useMemo(() => {
		return scaleLinear<number>({
			domain: historyDomain(shownLines, domain),
			range: [innerHeight, 0],
			nice: true,
		});
	}, [shownLines, domain, innerHeight]);
	const areaBaseline = useMemo(() => {
		const [domainMin] = yScale.domain();

		return yScale(Math.max(0, domainMin));
	}, [yScale]);
	const lineMarks = useMemo(() => {
		return shownLines.map((line) => ({
			line,
			points: line.values.map((value, index) => ({ x: xScale(index), y: yScale(value) })),
		}));
	}, [shownLines, xScale, yScale]);
	const positions = useMemo(() => {
		return view.timestamps.map((_, index) => xScale(index));
	}, [view.timestamps, xScale]);
	const ticks = useMemo(() => {
		return domainTicks(domain, innerWidth);
	}, [domain, innerWidth]);

	const hover = useIndexHover(positions, HISTORY_MARGIN.left);
	const hoveredIndex = indexInDomain(hover.index, domain);

	return {
		innerWidth,
		innerHeight,
		visibleWallets,
		resetKey,
		xScale,
		yScale,
		areaBaseline,
		lineMarks,
		positions,
		ticks,
		hover,
		hoveredIndex,
	};
};

export { useBalanceHistoryPlot };
export type { BalanceHistoryPlotParams };
