export const WALLETS_CACHE_KEYS = {
	list: 'wallets',
	fetch: 'wallet',
	delete: 'deleteWallet',
	update: 'updateWallet',
	create: 'createWallet',
	search: 'searchWallet',
};

export const WALLET_RECENT_LIMIT = 3;

export const GOALS_CACHE_KEYS = {
	list: 'goals',
	fetch: 'goal',
	create: 'createGoal',
	update: 'updateGoal',
	delete: 'deleteGoal',
};

export const DEFAULT_WALLET_PERIOD = 'last_month' as const;
