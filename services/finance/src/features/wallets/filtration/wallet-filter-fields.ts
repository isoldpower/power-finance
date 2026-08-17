import { DATE_OPERATORS, NUMERIC_OPERATORS, REFERENCE_OPERATORS, TEXT_OPERATORS } from "@shared/api";

import type { FilterFieldOption } from "@shared/api";


const WALLET_FILTER_FIELDS: FilterFieldOption[] = [
	{ field: 'name', label: 'Name', operators: TEXT_OPERATORS },
	{ field: 'currency', label: 'Currency', operators: REFERENCE_OPERATORS },
	{ field: 'balance', label: 'Balance', operators: NUMERIC_OPERATORS },
	{ field: 'created_at', label: 'Created at', operators: DATE_OPERATORS },
];

export { WALLET_FILTER_FIELDS };
