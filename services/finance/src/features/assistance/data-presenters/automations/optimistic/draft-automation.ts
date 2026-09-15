import { v4 as uuidv4 } from "uuid";

import type { Automation, AutomationDraft } from "@entity/assistance";


const OPTIMISTIC_ID_PREFIX = 'optimistic';

const optimisticAutomationId = (): string => `${OPTIMISTIC_ID_PREFIX}:${uuidv4()}`;

const isOptimisticAutomationId = (id: string): boolean => id.startsWith(`${OPTIMISTIC_ID_PREFIX}:`);

const automationFromDraft = (
	draft: AutomationDraft,
	id: string,
	createdAt: string,
): Automation => ({
	id,
	createdAt,
	updatedAt: null,
	deletedAt: null,
	name: draft.name,
	icon: draft.icon,
	enabled: draft.enabled,
	trigger: draft.trigger,
	effects: draft.effects,
	lastRunAt: null,
	runs: 0,
});

export { automationFromDraft, isOptimisticAutomationId, optimisticAutomationId };
