interface OperationOverride {
	verb?: string;
	subject?: string;
}

const OPERATION_OVERRIDES: Record<string, OperationOverride> = {
	transactionsSearch: { 
		verb: 'search', 
		subject: 'transactions' 
	},
	searchWallet: { 
		verb: 'search', 
		subject: 'wallets' 
	},
	transactionReceiptScan: { 
		verb: 'scan', 
		subject: 'receipt' 
	},
	'currency-convert': { 
		verb: 'convert', 
		subject: 'currency' 
	},
	'currency-rates': { 
		subject: 'exchange rates' 
	},
	'auth-session': { 
		subject: 'your session' 
	},
	'update-preferences': { 
		subject: 'preferences' 
	},
	'notifications-count': { 
		subject: 'notification count' 
	},
};

export { OPERATION_OVERRIDES };
export type { OperationOverride };
