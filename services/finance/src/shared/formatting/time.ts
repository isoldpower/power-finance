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

export { relativeAgo };
