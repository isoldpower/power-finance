import type { TabKey } from "@entity/navigation";


const TAB_SEGMENTS: Record<TabKey, string> = {
	dashboard: 'dashboard',
	management: 'management',
	planning: 'planning',
};

const segmentsOf = (pathname: string): string[] => (
	pathname.split('/').filter((segment) => segment.length > 0)
);

const resolveActiveTab = (pathname: string): TabKey | null => {
	const segments = segmentsOf(pathname);
	const entries = Object.entries(TAB_SEGMENTS) as [TabKey, string][];
	const match = entries.find(([, segment]) => segments.includes(segment));

	return match?.[0] ?? null;
};

export { resolveActiveTab };
