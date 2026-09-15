import { DATE_OPERATORS, NUMERIC_OPERATORS, REFERENCE_OPERATORS, TEXT_OPERATORS } from "@shared/api";

import type { FilterFieldOption } from "@shared/api";


const GOAL_FILTER_FIELDS: FilterFieldOption[] = [
	{ field: 'name', label: 'Name', operators: TEXT_OPERATORS },
	{ field: 'currency', label: 'Currency', operators: REFERENCE_OPERATORS },
	{ field: 'target', label: 'Target', operators: NUMERIC_OPERATORS },
	{ field: 'progress', label: 'Progress', operators: NUMERIC_OPERATORS },
	{ field: 'finish_at', label: 'Finish date', operators: DATE_OPERATORS },
	{ field: 'created_at', label: 'Created at', operators: DATE_OPERATORS },
];

export { GOAL_FILTER_FIELDS };
