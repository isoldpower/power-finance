import { getAnalyticsRoute, getFinanceRoute, getShellRoute } from "@internal/shared";
import { Icons } from "@internal/ui-library";

import type { SidebarNavSection } from "./types.ts";


const SIDEBAR_SECTIONS: SidebarNavSection[] = [
	{
		title: 'Information',
		links: [
			{ title: 'Landing', url: getShellRoute('landing'), icon: Icons.ScanSearch },
		],
	},
	{
		title: 'Finance Application',
		links: [
			{ title: 'Dashboard', url: getFinanceRoute('dashboard'), icon: Icons.SquareKanban },
		],
	},
	{
		title: 'Analytics',
		links: [
			{ title: 'Main Metrics', url: getAnalyticsRoute('dashboard'), icon: Icons.ActivitySquare },
		],
	},
];

export { SIDEBAR_SECTIONS };
