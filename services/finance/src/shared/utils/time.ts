const relativeTime = (iso?: string): string => {
	if (!iso) return '—';
	const then = new Date(iso).getTime();
	const diffMs = Date.now() - then;
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
	if (diffHours < 1) return 'just now';
	if (diffHours < 24) return `${diffHours.toString()}h ago`;
	const diffDays = Math.floor(diffHours / 24);
	if (diffDays < 7) return `${diffDays.toString()}d ago`;
	return `${Math.floor(diffDays / 7).toString()}w ago`;
};

const DAY_MS = 24 * 60 * 60 * 1000;

const relativeAgo = (iso: string): string => {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return iso;
	const daysAgo = Math.round((Date.now() - date.getTime()) / DAY_MS);
	if (daysAgo <= 0) return 'now';
	if (daysAgo < 14) return `${daysAgo.toString()} day${daysAgo === 1 ? '' : 's'} ago`;
	if (daysAgo < 60) return `${Math.round(daysAgo / 7).toString()} weeks ago`;
	const months = Math.round(daysAgo / 30);
	return `${months.toString()} month${months === 1 ? '' : 's'} ago`;
};

export { relativeTime, relativeAgo };
