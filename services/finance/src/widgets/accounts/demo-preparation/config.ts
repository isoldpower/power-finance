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

export { PREPARATION_MESSAGE_INTERVAL_MS, PREPARATION_MESSAGES };
