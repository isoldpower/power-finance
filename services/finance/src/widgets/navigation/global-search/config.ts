import type { PageEntry } from "@feature/navigation/website-search";


const PAGES: PageEntry[] = [
	{ route: 'dashboard', label: 'Dashboard', hint: 'Net worth, cash flow, activity' },
	{ route: 'management', label: 'Management', hint: 'Wallets, transactions, ledger' },
	{ route: 'planning', label: 'Planning', hint: 'Goals, automations, AI' },
	{ route: 'settings', label: 'Settings', hint: 'Preferences and account' },
];


export { PAGES };
