import type { FC } from "react";
import { getIsEmbedded } from "@internal/shared";
import { cn } from "@internal/ui-library";

import { useNotifications, useNotificationsCount } from "@feature/assistance";
import { useActiveTab, RouteLink, useRouteNavigate } from "@feature/navigation";

import { BrandMark } from "@entity/navigation";
import { NavbarSearch } from "@widget/navigation/search/NavbarSearch.tsx";
import { NavbarTabs } from "@widget/navigation/navbar/NavbarTabs.tsx";
import { NavbarNotifications } from "@widget/navigation/navbar/NavbarNotifications.tsx";
import { NavbarAccountMenu } from "@widget/navigation/navbar/NavbarAccountMenu.tsx";
import { TABS } from "@widget/navigation/config.ts";

const FinanceNavbar: FC = () => {
	const isEmbedded = getIsEmbedded();
	const navigateToRoute = useRouteNavigate();
	const { tabs, activeTab, activeLabel, onTabChange } = useActiveTab(TABS);
	const { notifications } = useNotifications({ limit: 8 });
	const { count: unreadCount } = useNotificationsCount(false);

	return (
		<header
			className={cn(
				"sticky top-0 z-30 flex items-center gap-4 border-b border-border bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] py-2.5 pr-[22px] backdrop-blur-[14px]",
				isEmbedded ? "pl-16" : "pl-[22px]"
			)}
		>
			<RouteLink to="dashboard" className="flex items-center gap-2.5">
				<BrandMark />
			</RouteLink>

			<NavbarTabs tabs={tabs} activeTab={activeTab} activeLabel={activeLabel} onTabChange={onTabChange} />

			<div className="flex-1" />

			<NavbarSearch />

			<NavbarNotifications notifications={notifications} unreadCount={unreadCount} />

			<NavbarAccountMenu onOpenSettings={() => { navigateToRoute('settings'); }} />
		</header>
	);
};

FinanceNavbar.displayName = 'FinanceNavbar';

export { FinanceNavbar };
