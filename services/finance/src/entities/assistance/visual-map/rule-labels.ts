const OPERATOR_LABEL: Record<string, string> = {
	eq: 'is',
	neq: 'is not',
	gt: '>',
	gte: '>=',
	lt: '<',
	lte: '<=',
	in: 'in',
	contains: 'contains',
	icontains: '~',
};

const EVENT_LABEL: Record<string, string> = {
	'transaction.created': 'a transaction is recorded',
	'transaction.updated': 'a transaction changes',
};

const operatorLabel = (operator: string): string => {
	return OPERATOR_LABEL[operator] ?? operator;
};

const eventLabel = (event: string): string => {
	return EVENT_LABEL[event] ?? 'an event fires';
};

export { eventLabel, operatorLabel };
