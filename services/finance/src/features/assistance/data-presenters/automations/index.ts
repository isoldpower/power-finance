export { useAutomation } from './use-automation.ts';
export { useAutomations } from './use-automations.ts';
export { useAutomationsSearch } from './use-automations-search.ts';
export { useCreateAutomation } from './use-create-automation.ts';
export { useDeleteAutomation } from './use-delete-automation.ts';
export { useUpdateAutomation } from './use-update-automation.ts';
export {
	automationFromDraft,
	isOptimisticAutomationId,
	optimisticAutomationId,
	useOptimisticAutomations,
} from './optimistic';

export type { UseAutomationOptions, UseAutomationReturn } from './use-automation.ts';
export type { UseAutomationsOptions, UseAutomationsReturn } from './use-automations.ts';
export type {
	UseAutomationsSearchOptions,
	UseAutomationsSearchParams,
	UseAutomationsSearchReturn,
} from './use-automations-search.ts';
export type { UpdateAutomationInput } from './use-update-automation.ts';
export type { CreateAutomationContext } from './use-create-automation.ts';
export type { AutomationCachesSnapshot, UseOptimisticAutomationsReturn } from './optimistic';
