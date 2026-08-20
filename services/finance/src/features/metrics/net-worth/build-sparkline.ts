import { PAD, VIEW_H, VIEW_W } from "@entity/metrics";

import type { NetWorthPoint } from "@entity/metrics";


interface ChartPoint {
	xPct: number;
	yPct: number;
	value: number;
	date: string;
}

const buildSparkline = (series: NetWorthPoint[]) => {
	if (series.length < 2) return { stroke: '', fill: '', lastY: VIEW_H / 2, points: [] as ChartPoint[] };
	const values = series.map((point) => point.money.amount);
	const min = Math.min(...values);
	const max = Math.max(...values);
	const span = max - min || 1;
	const coords = values.map((value, index) => {
		const x = (index / (values.length - 1)) * VIEW_W;
		const y = VIEW_H - ((value - min) / span) * (VIEW_H - PAD * 2) - PAD;
		return [x, y] as const;
	});
	const stroke = coords.map(([x, y], index) => `${index ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
	const points = coords.map(([x, y], index) => ({
		xPct: (x / VIEW_W) * 100,
		yPct: (y / VIEW_H) * 100,
		value: series[index].money.amount,
		date: series[index].timestamp,
	}));
	
	return {
		stroke,
		fill: `${stroke} L${VIEW_W.toString()} ${VIEW_H.toString()} L0 ${VIEW_H.toString()} Z`,
		lastY: coords[coords.length - 1][1],
		points,
	};
};

export { buildSparkline };
export type { ChartPoint };
