import { PieArcDatum } from "@visx/shape/lib/shapes/Pie";
import { FC, ReactNode, useCallback } from "react";

interface SelectPieChartProps {
	children: ReactNode;
	animate: boolean;
	selectedCategory: string | null;
	arc: PieArcDatum<{
		category: string;
		amount: number;
	}>;
	onHoverChange: (category: string | null) => void;
	onSelectChange: (category: string | null) => void;
}

const PieChartInteractions: FC<SelectPieChartProps> = ({ 
	children,
	animate,
	arc,
	onHoverChange,
	onSelectChange,
	selectedCategory
}) => {
	const handleSelectCategory = useCallback((category: string) => {
		if (animate) {
			const newCategory = selectedCategory && selectedCategory === category ? null : category;
			onSelectChange(newCategory)
		}
	}, [animate, onSelectChange, selectedCategory]);

	const handleHoverChange = useCallback((category: string | null) => {
		onHoverChange(category)
	}, [onHoverChange]);
	
	return (
		<g
			onClick={() => { handleSelectCategory(arc.data.category) }}
			onTouchStart={() => { handleSelectCategory(arc.data.category) }}
			onMouseEnter={() => { handleHoverChange(arc.data.category) }}
			onMouseLeave={() => { handleHoverChange(null) }}
		>
			{children}
		</g>
	)
}

PieChartInteractions.displayName = 'PieChartInteractions';

export { PieChartInteractions };
export type { SelectPieChartProps };