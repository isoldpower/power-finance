const FUND_GOAL_LABELS = {
	source: 'From',
	sent: 'Send',
	received: 'Receive',
	submit: 'Add to goal',
	pending: 'Adding…',
};

const NEW_GOAL_LABELS = {
	title: 'New goal',
	intro: 'Set a target and a date to track your progress.',
	submit: 'Create goal',
	pending: 'Creating…',
};

const fundGoalTitle = (goalName: string): string => `Add to ${goalName}`;

export { FUND_GOAL_LABELS, NEW_GOAL_LABELS, fundGoalTitle };
