import type { AutomationEvent } from "@entity/assistance";


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

export type { FilterInputKind, FilterPolicyInput, FilterPolicySource };
