import type { FilterOperator } from "@shared/api";
import type { AutomationEvent } from "@entity/assistance";
import type { FilterInputKind, FilterPolicySource } from "./types.ts";


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

const FALLBACK_EVENT: AutomationEvent = 'transaction.created';
const FALLBACK_KIND: FilterInputKind = 'text';
const MULTI_OPERATOR: FilterOperator = 'in';
const MULTI_SEPARATOR = ',';

export {
	BOOLEAN_FIELDS,
	FALLBACK_EVENT,
	FALLBACK_KIND,
	FILTER_POLICY_INPUTS,
	MULTI_OPERATOR,
	MULTI_SEPARATOR,
	TRANSACTION_FIELD_INPUTS,
	WALLET_FIELD_INPUTS,
};
