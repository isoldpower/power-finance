import { parseAmount } from "@internal/shared";

import type { SpendingRhythm } from "../types.ts";
import type { RhythmGrid } from "./types.ts";


const HOURS = 24;
const WEEKDAYS = 7;

const cellKey = (weekday: number, hour: number): string => `${weekday.toString()}:${hour.toString()}`;

const toRhythmGrid = (rhythm: SpendingRhythm): RhythmGrid => {
	const lookup = new Map(rhythm.cells.map((cell) => [cellKey(cell.weekday, cell.hour), cell]));
	const columns = Array.from({ length: HOURS }, (_, hour) => ({
		bin: hour,
		bins: Array.from({ length: WEEKDAYS }, (__, index) => {
			const weekday = index + 1;
			const cell = lookup.get(cellKey(weekday, hour));

			return {
				bin: index,
				count: cell ? parseAmount(cell.amount.amount) : 0,
				transactions: cell?.transactionsCount ?? 0,
			};
		}),
	}));

	const counts = columns.flatMap((column) => column.bins.map((bin) => bin.count));

	return {
		columns,
		peak: Math.max(0, ...counts),
	};
};

export { toRhythmGrid };
