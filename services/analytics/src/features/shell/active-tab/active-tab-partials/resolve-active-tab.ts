import type { AnalyticsTabKey } from "@entity/shell";


const TAB_SEGMENTS: Record<AnalyticsTabKey, string> = {
	overview: 'overview',
	spending: 'spending',
	flow: 'flow',
};

const resolveActiveTab = (pathname: string): AnalyticsTabKey | null => {
	const segments = pathname.split('/').filter((segment) => segment.length > 0);
	const match = (Object.entries(TAB_SEGMENTS) as [AnalyticsTabKey, string][])
		.find(([, segment]) => segments.includes(segment));

	return match?.[0] ?? null;
};

export { resolveActiveTab };
