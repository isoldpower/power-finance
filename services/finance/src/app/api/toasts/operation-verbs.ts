interface OperationVerb {
	gerund: string;
	past: string;
	base: string;
}

const READ_VERB: OperationVerb = { 
	gerund: 'Loading',
	past: 'loaded',
	base: 'load',
};

const OPERATION_VERBS: Record<string, OperationVerb> = {
	create: { 
		gerund: 'Creating', 
		past: 'created', 
		base: 'create',
	},
	update: { 
		gerund: 'Updating', 
		past: 'updated', 
		base: 'update',
	},
	replace: { 
		gerund: 'Replacing', 
		past: 'replaced', 
		base: 'replace',
	},
	adjust: { 
		gerund: 'Adjusting', 
		past: 'adjusted', 
		base: 'adjust',
	},
	delete: { 
		gerund: 'Deleting', 
		past: 'deleted', 
		base: 'delete',
	},
	rotate: { 
		gerund: 'Rotating', 
		past: 'rotated', 
		base: 'rotate',
	},
	subscribe: { 
		gerund: 'Subscribing to', 
		past: 'subscribed', 
		base: 'subscribe to',
	},
	unsubscribe: { 
		gerund: 'Unsubscribing from', 
		past: 'unsubscribed', 
		base: 'unsubscribe from',
	},
	resolve: { 
		gerund: 'Resolving', 
		past: 'resolved', 
		base: 'resolve',
	},
	ack: { 
		gerund: 'Acknowledging', 
		past: 'acknowledged', 
		base: 'acknowledge',
	},
	send: { 
		gerund: 'Sending', 
		past: 'sent', 
		base: 'send',
	},
	clear: { 
		gerund: 'Clearing', 
		past: 'cleared', 
		base: 'clear',
	},
	scan: { 
		gerund: 'Scanning', 
		past: 'scanned', 
		base: 'scan',
	},
	convert: { 
		gerund: 'Converting', 
		past: 'converted', 
		base: 'convert',
	},
	search: { 
		gerund: 'Searching', 
		past: 'found', 
		base: 'search',
	},
};

export { OPERATION_VERBS, READ_VERB };
export type { OperationVerb };
