import type {ForwardRefExoticComponent, RefAttributes} from "react";

import { getFinanceRoute } from "@internal/shared";
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
					title: 'Overview',
					url: '/analytics/overview'
				},
				{
					title: 'Protected View',
					url: '/analytics/protected'
				},
			],
		}
	]
}

export { data };
export type { NavigationItem, Navigation, NavigationLink, NavigationGroup };