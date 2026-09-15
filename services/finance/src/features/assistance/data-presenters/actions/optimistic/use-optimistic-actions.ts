import { useCallback, useMemo } from "react";
import { useOptimisticCache } from "@shared/data";

import { ACTION_RESOURCE } from "./resource.ts";

import type { Action } from "@entity/assistance";
import type { ActionCachesSnapshot } from "./types.ts";


interface UseOptimisticActionsReturn {
	capture: () => Promise<ActionCachesSnapshot>;
	restore: (snapshot: ActionCachesSnapshot | undefined) => void;
	applyResolve: (id: string, resolvedAt: string) => void;
	applySettled: (id: string, action: Action) => void;
}

const useOptimisticActions = (): UseOptimisticActionsReturn => {
	const cache = useOptimisticCache(ACTION_RESOURCE);

	const applyResolve = useCallback((id: string, resolvedAt: string): void => {
		cache.patchPaged(id, (action) => ({ ...action, status: 'resolved', resolvedAt }));
	}, [cache]);

	const applySettled = useCallback((id: string, action: Action): void => {
		cache.settlePaged(id, action);
	}, [cache]);

	return useMemo(() => ({
		capture: cache.capture,
		restore: cache.restore,
		applyResolve,
		applySettled,
	}), [cache.capture, cache.restore, applyResolve, applySettled]);
};

export { useOptimisticActions };
export type { UseOptimisticActionsReturn };
