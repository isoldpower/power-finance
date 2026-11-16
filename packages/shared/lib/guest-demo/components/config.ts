import type { GuestDemoModePhase } from "../types.ts";


const PREPARATION_MESSAGE_INTERVAL_MS = 1000;

const PREPARATION_MESSAGES = [
	'Initializing database indices',
	'Populating sample records',
	'Warming up caches',
	'Synchronizing read models',
	'Building search indices',
	'Reconciling balances',
	'Verifying data integrity',
	'Preparing your workspace',
] as const;

const PREPARATION_HEADING = 'Preparing your demo';

const PREPARATION_DESCRIPTION = 'We are populating a sandbox with sample data so you can explore without signing in. '
	+ 'This only happens once and takes a few seconds.';

const EARLY_ENTRY_NOTICE = 'Your sample data is ready, but search is still being indexed. If you continue now, '
	+ 'search results and filtered lists may be incomplete or change for a few more seconds.';

const PREPARATION_FAILED_HEADING = 'Could not prepare your demo';

const PREPARATION_FAILED_DESCRIPTION = 'Setting up the sample data failed. Trying again picks up where it '
	+ 'stopped, so nothing is duplicated.';

const DEMO_MODE_TAG = 'Demo mode';

const DEMO_MODE_MESSAGES = {
	demo: "You're exploring sample data. Changes are temporary and not tied to an account.",
	indexing: "You're exploring sample data. Search data is still indexing, so some results may be "
		+ 'incomplete. Reload the page once it finishes.',
	indexed: "You're exploring sample data. Indexing finished. Reload the page to see complete data.",
} as const satisfies Record<Exclude<GuestDemoModePhase, 'inactive'>, string>;

export {
	DEMO_MODE_MESSAGES,
	DEMO_MODE_TAG,
	EARLY_ENTRY_NOTICE,
	PREPARATION_DESCRIPTION,
	PREPARATION_FAILED_DESCRIPTION,
	PREPARATION_FAILED_HEADING,
	PREPARATION_HEADING,
	PREPARATION_MESSAGE_INTERVAL_MS,
	PREPARATION_MESSAGES,
};
