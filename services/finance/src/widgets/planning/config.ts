// Goals card.
const GOALS_PAGE_SIZE = 5;

const GOALS_STATUS_OPTIONS = [
	{ value: 'all', label: 'All goals' },
	{ value: 'in-progress', label: 'In progress' },
	{ value: 'reached', label: 'Reached' },
];

// Automations card.
const AUTOMATIONS_PAGE_SIZE = 5;

const AUTOMATIONS_STATUS_OPTIONS = [
	{ value: 'all', label: 'All statuses' },
	{ value: 'active', label: 'Active' },
	{ value: 'paused', label: 'Paused' },
];

// New-goal panel icon choices.
const EMOJI_OPTIONS = ['🎯', '🛟', '✈', '🏠', '🚗', '💍', '🎓', '🏖', '💰', '📈', '🐷', '🎁', '🏥', '👶', '💻', '🎸'];

export {
	GOALS_PAGE_SIZE,
	GOALS_STATUS_OPTIONS,
	AUTOMATIONS_PAGE_SIZE,
	AUTOMATIONS_STATUS_OPTIONS,
	EMOJI_OPTIONS,
};
