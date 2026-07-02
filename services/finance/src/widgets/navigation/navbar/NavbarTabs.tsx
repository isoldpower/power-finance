import type { FC } from "react";
import {
	cn,
	FinanceSegmented,
	FinanceSegmentedItem,
	FinanceMenu,
	FinanceMenuTrigger,
	FinanceMenuContent,
	FinanceMenuItem,
} from "@internal/ui-library";

import { ChevronDownIcon } from "@entity/navigation";
import { useDisclosure } from "@shared/interactions";
import type { NavTab } from "@feature/navigation";

interface NavbarTabsProps {
	tabs: NavTab[];
	activeTab: string;
	activeLabel: string;
	onTabChange: (key: string) => void;
}

const NavbarTabs: FC<NavbarTabsProps> = ({ tabs, activeTab, activeLabel, onTabChange }) => {
	const { open: navMenuOpen, setOpen: setNavMenuOpen } = useDisclosure();

	return (
		<>
			<div className="hidden md:block">
				<FinanceSegmented value={activeTab} onValueChange={onTabChange}>
					{tabs.map((tab) => (
						<FinanceSegmentedItem key={tab.key} value={tab.key} className="h-7">
							{tab.label}
						</FinanceSegmentedItem>
					))}
				</FinanceSegmented>
			</div>

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
								onClick={() => { setNavMenuOpen(false); onTabChange(tab.key); }}
								className={cn(tab.key === activeTab && "text-primary")}
							>
								{tab.label}
							</FinanceMenuItem>
						))}
					</FinanceMenuContent>
				</FinanceMenu>
			</div>
		</>
	);
};

NavbarTabs.displayName = 'NavbarTabs';

export { NavbarTabs };
export type { NavbarTabsProps };
