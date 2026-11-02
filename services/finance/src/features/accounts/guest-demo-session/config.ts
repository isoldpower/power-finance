const GUEST_DEMO_SESSION_STORAGE_KEY = 'guest-demo-session';
const TOKEN_RENEWAL_MARGIN_MS = 5 * 60 * 1000;

const PREPARATION_STATUS_ORDER = {
	preparing: 0,
	browsable: 1,
	ready: 2,
} as const;

export { GUEST_DEMO_SESSION_STORAGE_KEY, PREPARATION_STATUS_ORDER, TOKEN_RENEWAL_MARGIN_MS };
