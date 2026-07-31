type ActionType = 'recurring' | 'duplicate' | 'uncategorized';

interface ActionLabels {
	primary: string;
	secondary: string;
}

interface Action {
	id: string;
	kind: ActionType;
	title: string;
	subtitle: string;
}

export type { ActionType, Action, ActionLabels };