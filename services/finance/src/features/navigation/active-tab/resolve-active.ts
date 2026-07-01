import type { TabKey } from "./types.ts";


const resolveActiveTab = (pathname: string): TabKey => {
	if (pathname.includes('/management')) return 'management';
	if (pathname.includes('/planning')) return 'planning';

	return 'dashboard';
};

export { resolveActiveTab };