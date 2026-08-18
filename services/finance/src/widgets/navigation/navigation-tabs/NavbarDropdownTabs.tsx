import { useCallback } from "react";
import {
	cn,
	FinanceMenu,
	FinanceMenuTrigger,
	FinanceMenuContent,
	FinanceMenuItem,
} from "@internal/ui-library";
import { ChevronDownIcon } from "@shared/pure-components/icons";
import { textClass } from "@shared/pure-components/typography";
import { useDisclosure } from "@shared/overlays";
import { useActiveTab } from "@feature/navigation";
import { NAVIGATION_TABS } from "./config.ts";

import type { FC, ReactNode } from "react";
import type { NavTab } from "@entity/navigation";


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
						className={cn(textClass({ size: '13', weight: 'semibold' }), "inline-flex items-center gap-1.5 rounded-[var(--radius-md)] border border-border-strong bg-card px-3 py-1.5")}
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
