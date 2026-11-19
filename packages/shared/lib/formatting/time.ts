const DAY_MS = 24 * 60 * 60 * 1000;

function relativeAgo(isoDate: string): string {
	const parsedDate = new Date(isoDate);
	if (Number.isNaN(parsedDate.getTime())) {
		return isoDate;
	}
	
	const daysAgo = Math.round((Date.now() - parsedDate.getTime()) / DAY_MS);
	const monthsAgo = Math.round(daysAgo / 30);
	const verboseDictionary = {
		'now': (daysAgo: number) => daysAgo <= 0,
		[`${daysAgo.toString()} day${daysAgo === 1 ? '' : 's'} ago`]: (daysAgo: number) => daysAgo < 14 && daysAgo > 0, 
		[`${Math.round(daysAgo / 7).toString()} weeks ago`]: (daysAgo: number) => daysAgo < 60 && daysAgo >= 14,
		[`${monthsAgo.toString()} month${monthsAgo === 1 ? '' : 's'} ago`]: (daysAgo: number) => daysAgo >= 60,
	};

	return Object
		.entries(verboseDictionary)
		.find(([, condition]) => condition(daysAgo))?.[0] ?? '';
}

export { relativeAgo };
