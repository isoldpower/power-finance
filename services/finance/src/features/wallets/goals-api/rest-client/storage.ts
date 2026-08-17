const GOALS_STORAGE_KEY = 'goals-v1';

interface StoredGoal {
	id: string;
	name: string;
	url: string | null;
	currency: string;
	finish_at: string;
	created_at: string;
	updated_at: string | null;
	deleted_at: string | null;
	target: string;
}

export { GOALS_STORAGE_KEY };
export type { StoredGoal };
