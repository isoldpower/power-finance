const API_BASE_PATH = '/api/v1';

const LIVE_API_MODE = 'live';

type ApiMode = 'mock' | 'live';

function resolveApiMode(rawMode: string | undefined): ApiMode {
	return rawMode === LIVE_API_MODE ? 'live' : 'mock';
}

export { API_BASE_PATH, resolveApiMode };
export type { ApiMode };
