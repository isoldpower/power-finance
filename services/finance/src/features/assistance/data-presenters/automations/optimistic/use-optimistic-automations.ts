import { useCallback, useMemo } from "react";
import { useOptimisticCache } from "@shared/data";

import { patchAutomation } from "./patch-automation.ts";
import { AUTOMATION_RESOURCE } from "./resource.ts";

import type { Automation, AutomationPatch } from "@entity/assistance";
import type { AutomationCachesSnapshot } from "./types.ts";


interface UseOptimisticAutomationsReturn {
	capture: () => Promise<AutomationCachesSnapshot>;
	restore: (snapshot: AutomationCachesSnapshot | undefined) => void;
	applyPatch: (id: string, patch: AutomationPatch) => void;
	applyCreate: (automation: Automation) => void;
	applyRemove: (id: string) => void;
	applySettled: (id: string, automation: Automation) => void;
}

const useOptimisticAutomations = (): UseOptimisticAutomationsReturn => {
	const cache = useOptimisticCache(AUTOMATION_RESOURCE);

	const applyPatch = useCallback((id: string, patch: AutomationPatch): void => {
		cache.patchPaged(id, (automation) => patchAutomation(automation, patch));
		cache.patchDetails(id, (automation) => patchAutomation(automation, patch));
	}, [cache]);

	const applyCreate = useCallback((automation: Automation): void => {
		cache.insertPaged([automation]);
	}, [cache]);

	const applyRemove = useCallback((id: string): void => {
		cache.removePaged([id]);
	}, [cache]);

	const applySettled = useCallback((id: string, automation: Automation): void => {
		cache.settlePaged(id, automation);
		cache.settleDetails(id, () => automation);
	}, [cache]);

	return useMemo(() => ({
		capture: cache.capture,
		restore: cache.restore,
		applyPatch,
		applyCreate,
		applyRemove,
		applySettled,
	}), [cache.capture, cache.restore, applyPatch, applyCreate, applyRemove, applySettled]);
};

export { useOptimisticAutomations };
export type { UseOptimisticAutomationsReturn };
