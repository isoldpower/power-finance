import { QUERY_KEYS } from "@shared/api";


const DERIVED_KEYS = {
	onLedgerChange: [
		QUERY_KEYS.wallets,
		QUERY_KEYS.walletsSearch,
		QUERY_KEYS.wallet,
		QUERY_KEYS.goals,
		QUERY_KEYS.goalsSearch,
		QUERY_KEYS.accounts,
		QUERY_KEYS.metrics,
	],
	onWalletChange: [
		QUERY_KEYS.wallets,
		QUERY_KEYS.walletsSearch,
		QUERY_KEYS.wallet,
		QUERY_KEYS.accounts,
		QUERY_KEYS.metrics,
	],
	onGoalChange: [
		QUERY_KEYS.goals,
		QUERY_KEYS.goalsSearch,
		QUERY_KEYS.goal,
		QUERY_KEYS.accounts,
		QUERY_KEYS.metrics,
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
		QUERY_KEYS.automationsSearch,
		QUERY_KEYS.automation,
	],
	onWebhookChange: [
		QUERY_KEYS.webhooks,
		QUERY_KEYS.webhook,
	],
	onSubscriptionChange: [
		QUERY_KEYS.webhookSubscriptions,
	],
	onPreferencesChange: [
		QUERY_KEYS.session,
		QUERY_KEYS.metrics,
		QUERY_KEYS.wallet,
		QUERY_KEYS.wallets,
		QUERY_KEYS.accounts,
		QUERY_KEYS.account,
	],
	onAssistantChange: [
		QUERY_KEYS.assistantMessages,
		QUERY_KEYS.assistantOverview,
	],
} as const;

export { DERIVED_KEYS };
