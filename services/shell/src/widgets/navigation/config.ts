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
			{ title: 'Management', url: getFinanceRoute('management'), icon: Icons.Banknote },
			{ title: 'Planning', url: getFinanceRoute('planning'), icon: Icons.Target },
		],
	},
	{
		title: 'Analytics',
		links: [
			{ title: 'Overview', url: getAnalyticsRoute('overview'), icon: Icons.ActivitySquare },
			{ title: 'Spending', url: getAnalyticsRoute('spending'), icon: Icons.PieChart },
			{ title: 'Money flow', url: getAnalyticsRoute('flow'), icon: Icons.ArrowLeftRight },
		],
	},
];

export { SIDEBAR_SECTIONS };
