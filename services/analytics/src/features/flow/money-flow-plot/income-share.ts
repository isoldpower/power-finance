import { formatPercent } from "@shared/formatting";


const incomeShare = (value: number, totalInflow: number): string => {
	const percent = (value / totalInflow) * 100;

	return formatPercent(percent);
};

export { incomeShare };
