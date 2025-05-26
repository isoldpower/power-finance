import { Group } from "@visx/group";
import { useCallback, type FC, type ReactNode } from "react";


interface RadialChartInteractionsProps {
	children: ReactNode;
	category: string;
	selectedCategory: string | null;
	onHoverChange: (category: string | null) => void;
	onSelectChange: (category: string | null) => void;
}

const RadialChartInteractions: FC<RadialChartInteractionsProps> = ({
	children,
	onHoverChange,
	category,
	selectedCategory,
	onSelectChange
}) => {
	const handleSelect = useCallback(() => {
		const isSelected = selectedCategory === category;
		const newSelected = isSelected ? null : category;

		onSelectChange(newSelected);
	}, [selectedCategory, category, onSelectChange]);

	return (
		<Group 
			onClick={handleSelect}
			onTouchStart={handleSelect}
			onMouseEnter={() => { onHoverChange(category) }}
			onMouseLeave={() => { onHoverChange(null) }}
		>
			{children}
		</Group>
	);
};

RadialChartInteractions.displayName = 'RadialChartInteractions';

export { RadialChartInteractions };
export type { RadialChartInteractionsProps };