const ACTIONS_CACHE_KEYS = {
	list: 'actions',
	resolve: 'resolveAction',
};

const AUTOMATIONS_CACHE_KEYS = {
	list: 'automations',
	fetch: 'automation',
	toggle: 'toggleAutomation',
	create: 'createAutomation',
	update: 'updateAutomation',
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

export const ASSISTANT_CACHE_KEYS = {
	content: 'assistantContent',
};
