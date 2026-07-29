import type { FC, ReactNode } from "react";

import { NavbarAccountMenu } from "@process/navigation";
import {
	FinanceBackground, 
	NavbarDropdownTabs,
	NavbarGroupTabs,
	NavbarNotifications,
	NavbarSearch
} from "@widget/navigation";
import { RouteLink } from "@feature/navigation";
import { BrandIcon, HeaderNavbar } from "@entity/navigation";


interface GlobalLayoutProps {
	children: ReactNode;
}

const GlobalLayout: FC<GlobalLayoutProps> = ({ children }) => {
	return (
		<div className="finance-theme relative flex min-h-screen flex-col bg-background text-foreground">
			<FinanceBackground />
			<div className="relative z-[1] flex min-h-screen flex-col">
				<HeaderNavbar>
					<div className="flex w-full justify-between items-center">
						<div className="flex items-center gap-4">
							<RouteLink to="dashboard" className="flex items-center gap-2.5">
								<BrandIcon />
							</RouteLink>
							<div className="hidden md:block">
								<NavbarGroupTabs>
									{(tab) => <>{tab.label}</>}
								</NavbarGroupTabs>
							</div>
							<div className="md:hidden">
								<NavbarDropdownTabs>
									{(tab) => <>{tab.label}</>}
								</NavbarDropdownTabs>
							</div>
						</div>
						<div className="flex gap-2">
							<NavbarSearch />
							<NavbarNotifications />
							<NavbarAccountMenu />
						</div>
					</div>
				</HeaderNavbar>
				<main className="flex-1">
					{children}
				</main>
			</div>
		</div>
	)
}

export { GlobalLayout };
