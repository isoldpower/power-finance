const ACTIONS_CACHE_KEYS = {
	list: 'actions',
	resolve: 'resolveAction',
};

const AUTOMATIONS_CACHE_KEYS = {
	list: 'automations',
	toggle: 'toggleAutomation',
	create: 'createAutomation',
	delete: 'deleteAutomation',
};

const NOTIFICATIONS_CACHE_KEYS = {
	list: 'notifications',
	count: 'notifications-count',
	ack: 'ackNotification',
};


export { 
	ACTIONS_CACHE_KEYS,
	AUTOMATIONS_CACHE_KEYS,
	NOTIFICATIONS_CACHE_KEYS,
};