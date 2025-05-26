import { Text } from '@visx/text';
import { useMemo } from "react";
import type { FC } from "react";


interface CategorisedPieChartAccentProps {
	selectedCategory: string | null;
	hoverCategory: string | null;
	data: {
		amount: number;
		category: string;
	}[];
}

const CategorisedPieChartAccent: FC<CategorisedPieChartAccentProps> = ({ 
	selectedCategory,
	hoverCategory,
	data
}) => {
	const accentCategory = useMemo(() => selectedCategory ?? (hoverCategory ?? null), [selectedCategory, hoverCategory]);
	const totalAmount = useMemo<number>(() => {
		return data.reduce((acc, { amount }) => acc + amount, 0);
	}, [data]);
	const accentCategoryAmount = useMemo<number>(() => {
		return accentCategory 
			? data.find(({ category }) => category === accentCategory)?.amount ?? 0 
			: totalAmount
	}, [accentCategory, data, totalAmount]);

	return (
		<>
			<Text textAnchor="middle" dominantBaseline="middle" fontSize={20} fill='black' dy={-20}>
				{[
					accentCategory ?? 'Total',
					`${(accentCategoryAmount / totalAmount * 100).toFixed(2).toString()}%`
				].filter(Boolean).join(' ')}
			</Text>
			<Text textAnchor="middle" dominantBaseline="middle" fontSize={14} fill='black' dy={20}>
				{[
					accentCategory && `$${accentCategoryAmount.toFixed(2).toString()}`,
					`$${totalAmount.toFixed(2).toString()}`
				].filter(Boolean).join(' / ')}
			</Text>
		</>
	);
}

export { CategorisedPieChartAccent };