const INITIAL_RECONNECT_DELAY_MS = 1000;
const MAX_RECONNECT_DELAY_MS = 30000;
const RECONNECT_BACKOFF_FACTOR = 2;

function nextReconnectDelay(previousDelay: number): number {
	return Math.min(
		previousDelay * RECONNECT_BACKOFF_FACTOR,
		MAX_RECONNECT_DELAY_MS,
	);
}

export { INITIAL_RECONNECT_DELAY_MS, MAX_RECONNECT_DELAY_MS, nextReconnectDelay };
