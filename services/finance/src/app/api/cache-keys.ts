const QUERY_KEYS = {
	wallets: 'wallets',
	wallet: 'wallet',
	transactions: 'transactions',
	transaction: 'transaction',
	accounts: 'accounts',
	account: 'account',
	accountEntries: 'account-entries',
	actions: 'actions',
	automations: 'automations',
	automation: 'automation',
	notifications: 'notifications',
	notificationsCount: 'notifications-count',
	webhooks: 'webhooks',
	summaryInsights: 'summary-insights',
	summaryLedgerBalance: 'summary-ledger-balance',
} as const;

const DERIVED_KEYS = {
	onLedgerChange: [QUERY_KEYS.wallets, QUERY_KEYS.summaryInsights, QUERY_KEYS.summaryLedgerBalance],
	onWalletChange: [QUERY_KEYS.summaryInsights, QUERY_KEYS.summaryLedgerBalance],
} as const;

export { DERIVED_KEYS };
