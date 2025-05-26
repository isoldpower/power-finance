import { useCallback } from "react";
import type { ReactNode } from "react";

import { GridChartCard } from "@entity/analytics";
import { useConfigurationStore } from "@feature/analytics";
import { SelectGraphType } from "@feature/analytics";
import type { CategoryGraphType } from "@feature/analytics";


interface CategoryBasedGraphsSetProps {
	graphSet: Record<CategoryGraphType, ReactNode>;
}

function CategoryBasedGraphsSet({
	graphSet
}: CategoryBasedGraphsSetProps) {
	const graphType = useConfigurationStore((state) => state.categoryGraphType);
	const setGraphType = useConfigurationStore((state) => state.setCategoryGraphType);

	const handleGraphTypeChange = useCallback((graphType: CategoryGraphType) => {
		setGraphType(graphType);
	}, [setGraphType]);

	return (
		<GridChartCard
			title="Category Based"
			description="Expenses by category"
			actions={
				<SelectGraphType<CategoryGraphType, string>
					className="max-w-40"
					graphType={graphType}
					onChange={handleGraphTypeChange}
					options={Object.fromEntries(
						Object.keys(graphSet).map((key) => [key, key.charAt(0).toUpperCase() + key.slice(1)])
					) as Record<CategoryGraphType, string>} />
			}
		>
			{Object.entries(graphSet).map(([key, value]) => {
				if (value && graphType === key) {
					return value as ReactNode;
				}

				return null;
			})}
		</GridChartCard>
	);
};

export { CategoryBasedGraphsSet };