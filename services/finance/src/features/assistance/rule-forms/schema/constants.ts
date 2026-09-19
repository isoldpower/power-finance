const CURRENCY_CODE_PATTERN = /^[A-Za-z]{3}$/;

const FILTER_OPERATORS = [
	'eq',
	'neq',
	'gt',
	'gte',
	'lt',
	'lte',
	'in',
	'contains',
	'icontains',
] as const;

export { CURRENCY_CODE_PATTERN, FILTER_OPERATORS };
