import type { FilterOperator } from "./types.ts";


const OPERATOR_LABELS: Record<FilterOperator, string> = {
	eq: 'is',
	neq: 'is not',
	gt: 'greater than',
	gte: 'at least',
	lt: 'less than',
	lte: 'at most',
	in: 'one of',
	contains: 'contains',
	icontains: 'contains (any case)',
};

export { OPERATOR_LABELS };