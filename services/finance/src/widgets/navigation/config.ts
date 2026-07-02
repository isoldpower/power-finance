import type { NavTab } from "@feature/navigation";
import type { PageEntry } from "@feature/navigation/website-search";

const TABS: NavTab[] = [
	{ key: 'dashboard', label: 'Dashboard' },
	{ key: 'management', label: 'Management' },
	{ key: 'planning', label: 'Planning' },
];

const PAGES: PageEntry[] = [
	{ route: 'dashboard', label: 'Dashboard', hint: 'Net worth, cash flow, activity' },
	{ route: 'management', label: 'Management', hint: 'Wallets, transactions, ledger' },
	{ route: 'planning', label: 'Planning', hint: 'Goals, automations, AI' },
	{ route: 'settings', label: 'Settings', hint: 'Preferences and account' },
];

const PALETTE = ['#4f46e5', '#4f46e5', '#4f46e5', '#8b5cf6', '#14b8a6'];
const PARTICLE_COUNT = 64;
const MAX_ALPHA = 0.16;

export { TABS, PAGES, PALETTE, PARTICLE_COUNT, MAX_ALPHA };
