import {LucideProps} from "lucide-react";
import type {ForwardRefExoticComponent, RefAttributes} from "react";

import {CreditCard, ClipboardIcon, SquareKanban, ScanSearch} from "lucide-react";

interface NavigationLink {
	title: string;
	url: string;
	icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
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
					icon: ScanSearch
				}
			]
		},
		{
			title: 'Finance Application',
			items: [
				{
					title: 'Dashboard',
					url: '/dashboard',
					icon: SquareKanban
				},
				{
					title: 'Transactions',
					url: '/transactions',
					icon: CreditCard
				},
				{
					title: 'Reports',
					url: '/reports',
					icon: ClipboardIcon
				},
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