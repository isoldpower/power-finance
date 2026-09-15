import { DATE_OPERATORS, REFERENCE_OPERATORS, TEXT_OPERATORS } from "@shared/api";

import type { FilterFieldOption } from "@shared/api";


const AUTOMATION_FILTER_FIELDS: FilterFieldOption[] = [
	{ field: 'name', label: 'Name', operators: TEXT_OPERATORS },
	{ field: 'enabled', label: 'Enabled', operators: REFERENCE_OPERATORS },
	{ field: 'trigger_type', label: 'Trigger', operators: REFERENCE_OPERATORS },
	{ field: 'event', label: 'Event', operators: REFERENCE_OPERATORS },
	{ field: 'schedule', label: 'Schedule', operators: REFERENCE_OPERATORS },
	{ field: 'created_at', label: 'Created at', operators: DATE_OPERATORS },
	{ field: 'last_run_at', label: 'Last run at', operators: DATE_OPERATORS },
];

export { AUTOMATION_FILTER_FIELDS };
