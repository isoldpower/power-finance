import type { GuestDemoModePhase } from "@feature/accounts";


const DEMO_MODE_TAG = 'Demo mode';

const DEMO_MODE_MESSAGES = {
	demo: "You're exploring sample data. Changes are temporary and not tied to an account.",
	indexing: "You're exploring sample data. Search data is still indexing, so some results may be "
		+ 'incomplete. Reload the page once it finishes.',
	indexed: "You're exploring sample data. Indexing finished. Reload the page to see complete data.",
} as const satisfies Record<Exclude<GuestDemoModePhase, 'inactive'>, string>;

const RELOAD_LABEL = 'Reload';

export { DEMO_MODE_MESSAGES, DEMO_MODE_TAG, RELOAD_LABEL };
