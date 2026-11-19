import { FinanceSegmented, FinanceSegmentedItem } from "@internal/ui-library";
import { useActiveTab } from "@feature/shell";
import { ANALYTICS_TABS } from "./config.ts";

import type { FC } from "react";


const AnalyticsTabs: FC = () => {
	const { activeTab, changeTab } = useActiveTab();

	return (
		<FinanceSegmented value={activeTab ?? ''} onValueChange={changeTab} aria-label="Analytics sections">
			{ANALYTICS_TABS.map((tab) => (
				<FinanceSegmentedItem key={tab.key} value={tab.key} title={tab.hint} className="h-7">
					{tab.label}
				</FinanceSegmentedItem>
			))}
		</FinanceSegmented>
	);
};

AnalyticsTabs.displayName = 'AnalyticsTabs';

export { AnalyticsTabs };
