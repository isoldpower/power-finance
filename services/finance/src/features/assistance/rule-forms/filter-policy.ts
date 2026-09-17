import type { FilterOperator } from "@shared/api";
import type { AutomationEvent, AutomationTriggerType } from "@entity/assistance";


type FilterInputKind =
	| 'text'
	| 'number'
	| 'date'
	| 'currency'
	| 'transactionType'
	| 'transactionOrigin'
	| 'wallet'
	| 'category'
	| 'boolean';

type FilterPolicySource = AutomationEvent | 'schedule';

interface FilterPolicyInput {
	kind: FilterInputKind;
	multiple: boolean;
}

const TRANSACTION_FIELD_INPUTS: Record<string, FilterInputKind> = {
	name: 'text',
	category: 'category',
	amount: 'number',
	currency: 'currency',
	type: 'transactionType',
	origin: 'transactionOrigin',
	wallet_id: 'wallet',
	chain_id: 'boolean',
	created_at: 'date',
};

const WALLET_FIELD_INPUTS: Record<string, FilterInputKind> = {
	name: 'text',
	currency: 'currency',
	balance: 'number',
	created_at: 'date',
};

const FILTER_POLICY_INPUTS: Record<FilterPolicySource, Record<string, FilterInputKind>> = {
	'transaction.created': TRANSACTION_FIELD_INPUTS,
	'transaction.updated': TRANSACTION_FIELD_INPUTS,
	schedule: WALLET_FIELD_INPUTS,
};

const BOOLEAN_FIELDS = new Set(['chain_id']);

const isBooleanField = (field: string): boolean => BOOLEAN_FIELDS.has(field);

const FALLBACK_EVENT: AutomationEvent = 'transaction.created';
const FALLBACK_KIND: FilterInputKind = 'text';
const MULTI_OPERATOR: FilterOperator = 'in';
const MULTI_SEPARATOR = ',';

const filterPolicySource = (
	triggerType: AutomationTriggerType,
	event: AutomationEvent | '',
): FilterPolicySource => {
	if (triggerType === 'schedule') return 'schedule';

	return event === '' ? FALLBACK_EVENT : event;
};

const resolveFilterInput = (
	source: FilterPolicySource,
	field: string,
	operator: FilterOperator,
): FilterPolicyInput => ({
	kind: FILTER_POLICY_INPUTS[source][field] ?? FALLBACK_KIND,
	multiple: operator === MULTI_OPERATOR,
});

const parseMultiValue = (value: string): string[] => (
	value.split(MULTI_SEPARATOR).map((entry) => entry.trim()).filter((entry) => entry !== '')
);

const formatMultiValue = (values: string[]): string => values.join(MULTI_SEPARATOR);

export {
	FILTER_POLICY_INPUTS,
	MULTI_SEPARATOR,
	filterPolicySource,
	formatMultiValue,
	isBooleanField,
	parseMultiValue,
	resolveFilterInput,
};
export type { FilterInputKind, FilterPolicyInput, FilterPolicySource };
