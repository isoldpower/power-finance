import { Text } from "@visx/text";
import { Group } from "@visx/group";
import type { FC } from "react";

import type { CategorisedDataPiece } from "../model";


interface CategorisedRadialChartCenterProps {
	accentCategory: string | null;
	data: CategorisedDataPiece[];
}

const CategorisedRadialChartCenter: FC<CategorisedRadialChartCenterProps> = ({ 
	data,
	accentCategory
 }) => {
	const total = data.reduce((acc, item) => acc + item.amount, 0);
	const accentCategoryData = data.find(item => item.category === accentCategory);
	const accentCategoryAmount = (accentCategory && accentCategoryData) ? accentCategoryData.amount : total;
	const accentCategoryPercentage = accentCategoryAmount / total * 100;

	return (
		<Group>
			<Text x={0} y={-12} textAnchor="middle" verticalAnchor="middle" fontSize={18} fontWeight="bold" fill="var(--color-foreground)">
				{[
					accentCategory ? accentCategory.slice(0, 1).toUpperCase() + accentCategory.slice(1) : 'Total',
				].join(' ')}
			</Text>
			<Text x={0} y={12} textAnchor="middle" verticalAnchor="middle" fontSize={13} fill="var(--color-foreground)">
				{[
					`$${accentCategoryAmount.toFixed(2).toString()}`,
					accentCategory && `(${accentCategoryPercentage.toFixed(2).toString()}%)`
				].join(' ')}
			</Text>
		</Group>
	);
};

CategorisedRadialChartCenter.displayName = 'CategorisedRadialChartCenter';

export { CategorisedRadialChartCenter };