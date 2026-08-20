import type { SelectOption } from "@shared/forms";


const PANEL_TITLE = 'New automation rule';

const PANEL_DESCRIPTION = 'Run an effect automatically whenever the trigger matches. '
	+ 'Leave the conditions empty to run every time.';

const CONDITIONS_LABEL = 'Only run when';

const CONDITIONS_HINT = 'No conditions yet — the rule runs every time the trigger fires.';

const ADD_CONDITION_LABEL = 'Add condition';

const SUBMIT_LABEL = 'Create rule';

const SUBMIT_PENDING_LABEL = 'Creating…';

const TRIGGER_TYPE_OPTIONS: SelectOption[] = [
	{ value: 'event', label: 'Event' },
	{ value: 'schedule', label: 'Schedule' },
];

const TRIGGER_EVENT_OPTIONS: SelectOption[] = [
	{ value: 'transaction.created', label: 'Transaction recorded' },
	{ value: 'transaction.updated', label: 'Transaction changed' },
];

const TRIGGER_SCHEDULE_OPTIONS: SelectOption[] = [
	{ value: 'daily', label: 'Every day' },
	{ value: 'weekly', label: 'Every week' },
	{ value: 'monthly', label: 'Every month' },
];

const COMBINATOR_OPTIONS: SelectOption[] = [
	{ value: 'and', label: 'Match all conditions' },
	{ value: 'or', label: 'Match any condition' },
];

const EFFECT_TYPE_OPTIONS: SelectOption[] = [
	{ value: 'set_category', label: 'Set a category' },
	{ value: 'notify', label: 'Send a notification' },
	{ value: 'raise_action', label: 'Raise an action' },
	{ value: 'transfer', label: 'Transfer money' },
];

const SEVERITY_OPTIONS: SelectOption[] = [
	{ value: 'info', label: 'Info' },
	{ value: 'warning', label: 'Warning' },
	{ value: 'critical', label: 'Critical' },
];

const RULE_ICON_OPTIONS: SelectOption[] = [
	{ value: 'rule', label: 'Rule' },
	{ value: 'tag', label: 'Tag' },
	{ value: 'transfer', label: 'Transfer' },
	{ value: 'alert', label: 'Alert' },
	{ value: 'report', label: 'Report' },
	{ value: 'receipt', label: 'Receipt' },
	{ value: 'schedule', label: 'Schedule' },
];

const OPERATOR_LABELS: Record<string, string> = {
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

export {
	ADD_CONDITION_LABEL,
	COMBINATOR_OPTIONS,
	CONDITIONS_HINT,
	CONDITIONS_LABEL,
	EFFECT_TYPE_OPTIONS,
	OPERATOR_LABELS,
	RULE_ICON_OPTIONS,
	PANEL_DESCRIPTION,
	PANEL_TITLE,
	SEVERITY_OPTIONS,
	SUBMIT_LABEL,
	SUBMIT_PENDING_LABEL,
	TRIGGER_EVENT_OPTIONS,
	TRIGGER_SCHEDULE_OPTIONS,
	TRIGGER_TYPE_OPTIONS,
};
