import type {ForwardRefExoticComponent, RefAttributes} from "react";

import { getAnalyticsRoute, getFinanceRoute } from "@internal/shared";
import { Icons } from "@internal/ui-library";


interface NavigationLink {
	title: string;
	url: string;
	icon?: ForwardRefExoticComponent<Omit<Icons.LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
	items?: never;
}

interface NavigationGroup {
	title: string;
	items: NavigationItem[];
}

type NavigationItem = NavigationLink | NavigationGroup;

interface Navigation {
	navMain: NavigationItem[];
}

const data: Navigation = {
	navMain: [
		{
			title: 'Information',
			items: [
				{
					title: 'Landing',
					url: '/landing',
					icon: Icons.ScanSearch
				}
			]
		},
		{
			title: 'Finance Application',
			items: [
				{
					title: 'Dashboard',
					url: getFinanceRoute('dashboard'),
					icon: Icons.SquareKanban
				}
			],
		},
		{
			title: 'Analytics',
			items: [
				{
					title: 'Main Metrics',
					url: getAnalyticsRoute('dashboard'),
					icon: Icons.ActivitySquare
				},
			],
		}
	]
}

export { data };
export type { NavigationItem, Navigation, NavigationLink, NavigationGroup };