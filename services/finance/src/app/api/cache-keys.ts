const QUERY_KEYS = {
	wallets: 'wallets',
	walletsSearch: 'searchWallet',
	wallet: 'wallet',
	goals: 'goals',
	goal: 'goal',
	transactions: 'transactions',
	transactionsSearch: 'transactionsSearch',
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
	webhook: 'webhook',
	webhookEventTypes: 'webhook-event-types',
	webhookSubscriptions: 'webhook-subscriptions',
	webhookDeliveries: 'webhook-deliveries',
	assistantOverview: 'assistant-overview',
	assistantMessages: 'assistant-messages',
	metricsBalance: 'metrics-balance',
	metricsNetWorth: 'metrics-net-worth',
	metricsCashFlow: 'metrics-cash-flow',
} as const;

const DERIVED_KEYS = {
	onLedgerChange: [
		QUERY_KEYS.wallets,
		QUERY_KEYS.walletsSearch,
		QUERY_KEYS.wallet,
		QUERY_KEYS.goals,
		QUERY_KEYS.accounts,
		QUERY_KEYS.metricsBalance,
		QUERY_KEYS.metricsNetWorth,
		QUERY_KEYS.metricsCashFlow,
	],
	onWalletChange: [
		QUERY_KEYS.wallets,
		QUERY_KEYS.walletsSearch,
		QUERY_KEYS.wallet,
		QUERY_KEYS.accounts,
		QUERY_KEYS.metricsBalance,
		QUERY_KEYS.metricsNetWorth,
		QUERY_KEYS.metricsCashFlow,
	],
	onGoalChange: [
		QUERY_KEYS.goals,
		QUERY_KEYS.goal,
		QUERY_KEYS.accounts,
		QUERY_KEYS.metricsBalance,
		QUERY_KEYS.metricsNetWorth,
		QUERY_KEYS.metricsCashFlow,
	],
	onActionChange: [
		QUERY_KEYS.actions,
		QUERY_KEYS.notifications,
		QUERY_KEYS.notificationsCount,
	],
	onNotificationChange: [
		QUERY_KEYS.notifications,
		QUERY_KEYS.notificationsCount,
	],
	onAutomationChange: [
		QUERY_KEYS.automations,
		QUERY_KEYS.automation,
	],
	onWebhookChange: [
		QUERY_KEYS.webhooks,
		QUERY_KEYS.webhook,
	],
	onSubscriptionChange: [
		QUERY_KEYS.webhookSubscriptions,
	],
	onAssistantChange: [
		QUERY_KEYS.assistantMessages,
		QUERY_KEYS.assistantOverview,
	],
} as const;

export { DERIVED_KEYS, QUERY_KEYS };
