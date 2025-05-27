import { useCallback } from "react";
import type { ReactNode } from "react";

import { GridChartCard } from "@entity/analytics";
import { useConfigurationStore } from "@feature/analytics";
import { SelectGraphType } from "@feature/analytics";
import type { TrendsGraphType } from "@feature/analytics";


interface SpendingTrendsGraphsSetProps {
	graphSet: Record<TrendsGraphType, ReactNode>;
}

function SpendingTrendsGraphsSet({
	graphSet
}: SpendingTrendsGraphsSetProps) {
	const graphType = useConfigurationStore((state) => state.graphType);
	const setGraphType = useConfigurationStore((state) => state.setTrendsGraphType);

	const handleGraphTypeChange = useCallback((graphType: TrendsGraphType) => {
		setGraphType(graphType);
	}, [setGraphType]);

	return (
		<GridChartCard
			title="Spending Trends"
			description="Income vs. expenses over the period of time"
			actions={
				<SelectGraphType<TrendsGraphType, string>
					className="max-w-40"
					graphType={graphType}
					onChange={handleGraphTypeChange}
					options={Object.fromEntries(
						Object.keys(graphSet).map((key) => [key, key.charAt(0).toUpperCase() + key.slice(1)])
					) as Record<TrendsGraphType, string>} />
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

export { SpendingTrendsGraphsSet };