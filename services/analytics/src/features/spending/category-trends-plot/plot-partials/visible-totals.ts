import type { TrendRow } from "@entity/spending";


const visibleTotals = (rows: TrendRow[], visibleKeys: string[]): number[] => {
	return rows.map((row) => {
		return visibleKeys.reduce((total, key) => {
			const value = row.values[key] ?? 0;

			return total + value;
		}, 0);
	});
};

export { visibleTotals };
