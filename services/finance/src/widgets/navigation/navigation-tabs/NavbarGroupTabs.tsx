import { FinanceSegmented, FinanceSegmentedItem } from "@internal/ui-library";
import { useActiveTab } from "@feature/navigation";
import { NAVIGATION_TABS } from "./config.ts";

import type { FC, ReactNode } from "react";
import type { NavTab } from "@feature/navigation";


interface NavbarGroupTabsProps {
	children: (tab: NavTab) => ReactNode;
}

const NavbarGroupTabs: FC<NavbarGroupTabsProps> = ({ children }) => {
	const { tabs, activeTab, onTabChange } = useActiveTab(NAVIGATION_TABS);
	
	return (
		<FinanceSegmented value={activeTab} onValueChange={onTabChange}>
			{tabs.map((tab) => (
				<FinanceSegmentedItem key={tab.key} value={tab.key} className="h-7">
					{children(tab)}
				</FinanceSegmentedItem>
			))}
		</FinanceSegmented>
	);
};

NavbarGroupTabs.displayName = 'NavbarGroupTabs';

export { NavbarGroupTabs };
