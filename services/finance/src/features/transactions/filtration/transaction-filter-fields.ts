import {
	DATE_OPERATORS,
	NUMERIC_OPERATORS,
	REFERENCE_OPERATORS,
	TEXT_OPERATORS,
} from "@shared/api";

import type { FilterFieldOption } from "@shared/api";


const TRANSACTION_FILTER_FIELDS: FilterFieldOption[] = [
	{ field: 'name', label: 'Name', operators: TEXT_OPERATORS },
	{ field: 'category', label: 'Category', operators: TEXT_OPERATORS },
	{ field: 'amount', label: 'Amount', operators: NUMERIC_OPERATORS },
	{ field: 'currency', label: 'Currency', operators: REFERENCE_OPERATORS },
	{ field: 'type', label: 'Type', operators: REFERENCE_OPERATORS },
	{ field: 'origin', label: 'Origin', operators: REFERENCE_OPERATORS },
	{ field: 'wallet_id', label: 'Wallet', operators: REFERENCE_OPERATORS },
	{ field: 'chain_id', label: 'Chain', operators: REFERENCE_OPERATORS },
	{ field: 'created_at', label: 'Created at', operators: DATE_OPERATORS },
];

export { TRANSACTION_FILTER_FIELDS };
