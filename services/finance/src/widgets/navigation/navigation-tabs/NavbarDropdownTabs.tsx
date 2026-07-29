import { useCallback } from "react";
import { ChevronDownIcon } from "@entity/navigation";
import { useDisclosure } from "@shared/interactions";
import { useActiveTab } from "@feature/navigation";
import {
	cn,
	FinanceMenu,
	FinanceMenuTrigger,
	FinanceMenuContent,
	FinanceMenuItem,
} from "@internal/ui-library";
import { NAVIGATION_TABS } from "./config.ts";

import type { FC, ReactNode } from "react";
import type { NavTab } from "@feature/navigation";


interface NavbarDropdownTabsProps {
	children: (tab: NavTab) => ReactNode;
}

const NavbarDropdownTabs: FC<NavbarDropdownTabsProps> = ({ children }) => {
	const { open: navMenuOpen, setOpen: setNavMenuOpen } = useDisclosure();
	const { tabs, activeTab, activeLabel, onTabChange } = useActiveTab(NAVIGATION_TABS);
	
	const handleItemSelection = useCallback((tab: NavTab) => {
		setNavMenuOpen(false);
		onTabChange(tab.key);
	}, [onTabChange, setNavMenuOpen]);

	return (
		<div className="md:hidden">
			<FinanceMenu open={navMenuOpen} onOpenChange={setNavMenuOpen}>
				<FinanceMenuTrigger asChild>
					<button
						type="button"
						aria-label="Navigation"
						className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] border border-border-strong bg-card px-3 py-1.5 text-[13px] font-semibold"
					>
						{activeLabel}
						<ChevronDownIcon />
					</button>
				</FinanceMenuTrigger>
				<FinanceMenuContent align="start" className="w-44 p-1">
					{tabs.map((tab) => (
						<FinanceMenuItem
							key={tab.key}
							onClick={() => { handleItemSelection(tab); }}
							className={cn(tab.key === activeTab && "text-primary")}
						>
							{children(tab)}
						</FinanceMenuItem>
					))}
				</FinanceMenuContent>
			</FinanceMenu>
		</div>
	);
};

NavbarDropdownTabs.displayName = 'NavbarDropdownTabs';

export { NavbarDropdownTabs };
