import type { TabKey } from "./types.ts";


const resolveActiveTab = (
	pathname: string,
	defaultTab: TabKey,
): TabKey => {
	const pathnameChunks = pathname.split('/')
		.filter((item) => item.length > 0);
	
	const tabPathnameConditions: Record<TabKey, (pathname: string) => boolean> = {
		'management': (pathname: string) => pathname.includes('management'),
		'planning': (pathname: string) => pathname.includes('planning'),
		'dashboard': (pathname: string) => pathname.includes('dashboard') && pathnameChunks.length === 1,
	}
	
	const allFitting = Object.entries(tabPathnameConditions)
		.filter(([, condition]) => condition(pathname))
		.map(([tabName]) => tabName as TabKey);
	
	if (allFitting.length > 1) {
		throw new Error(
			'Got more than 1 occurrence while trying to resolve active tab. Expected 1 max. ' + 
			`All occurrences: ${Object.keys(allFitting).join(', ')}`
		);
	}
	
	return allFitting.at(0) ?? defaultTab;
};

export { resolveActiveTab };