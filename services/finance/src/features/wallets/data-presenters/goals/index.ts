export { useCreateGoal } from './use-create-goal.ts';
export { useDeleteGoal } from './use-delete-goal.ts';
export { useGoal } from './use-goal.ts';
export { useGoals } from './use-goals.ts';
export { useGoalsSearch } from './use-goals-search.ts';
export { useUpdateGoal } from './use-update-goal.ts';
export { goalFromDraft, isOptimisticGoalId, optimisticGoalId, useOptimisticGoals } from './optimistic';

export type { UseGoalOptions, UseGoalReturn } from './use-goal.ts';
export type { UseGoalsOptions, UseGoalsReturn } from './use-goals.ts';
export type {
	UseGoalsSearchOptions,
	UseGoalsSearchParams,
	UseGoalsSearchReturn,
} from './use-goals-search.ts';
export type { CreateGoalContext } from './use-create-goal.ts';
export type { GoalCachesSnapshot, UseOptimisticGoalsReturn } from './optimistic';
