const ANALYTICS_BASE_PATH = '/api/v1/analytics';
const CURRENCIES_BASE_PATH = '/api/v1/currencies';


const LIVE_API_MODE = 'live';

type ApiMode = 'mock' | 'live';

function resolveApiMode(rawMode: string | undefined): ApiMode {
	return rawMode === LIVE_API_MODE ? 'live' : 'mock';
}

export { ANALYTICS_BASE_PATH, CURRENCIES_BASE_PATH, resolveApiMode };
export type { ApiMode };
