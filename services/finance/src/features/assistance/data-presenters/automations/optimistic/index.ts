export {
	automationFromDraft,
	isOptimisticAutomationId,
	optimisticAutomationId,
} from './draft-automation.ts';
export { patchAutomation } from './patch-automation.ts';
export { useOptimisticAutomations } from './use-optimistic-automations.ts';
export { AUTOMATION_RESOURCE } from './resource.ts';

export type { UseOptimisticAutomationsReturn } from './use-optimistic-automations.ts';
export type { AutomationCachesSnapshot } from './types.ts';
