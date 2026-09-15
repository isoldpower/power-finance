const FALLBACK_KEY = 'request';

const readCacheKey = (key: unknown): string => {
	const head = Array.isArray(key) ? (key as unknown[])[0] : undefined;

	return typeof head === 'string' && head.length > 0 ? head : FALLBACK_KEY;
};

export { readCacheKey };
