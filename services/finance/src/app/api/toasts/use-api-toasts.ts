import { useCallback, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { hasStaleRecovery } from "../stale-refetch.ts";
import { API_MUTATION_TOAST_POLICY, API_QUERY_TOAST_POLICY, isSilentMutation } from "./config.ts";
import { readCacheKey } from "./read-cache-key.ts";
import { reportApiToast } from "./report-api-toast.ts";

import type { ApiToastPhase, MutationCompareArgument, QueryCompareArgument } from "./types.ts";


type QueryAction = Extract<QueryCompareArgument, { type: 'updated' }>['action'];
type MutationAction = Extract<MutationCompareArgument, { type: 'updated' }>['action'];

const queryPhase = (action: QueryAction): ApiToastPhase | null => {
	if (action.type === 'fetch') {
		return 'requested';
	} else if (action.type === 'success' && !action.manual) {
		return 'succeeded';
	}

	return action.type === 'error' 
		? 'failed' 
		: null;
};

const mutationPhase = (action: MutationAction): ApiToastPhase | null => {
	if (action.type === 'pending') {
		return 'requested';
	} else if (action.type === 'success') {
		return 'succeeded';
	}

	return action.type === 'error' ? 'failed' : null;
};

const readActionError = (action: QueryAction | MutationAction): unknown => {
	return 'error' in action 
		? action.error 
		: undefined;
}

interface QueryFailureState {
	error: Error | null;
	errorUpdateCount: number;
}

const isRecovering = (
	query: { state: QueryFailureState }
): boolean => {
	return hasStaleRecovery(
		query.state.error,
		query.state.errorUpdateCount,
	);
}

const useApiToasts = (): void => {
	const queryClient = useQueryClient();

	const onQueryEvent = useCallback((event: QueryCompareArgument) => {
		if (event.type !== 'updated') {
			return;
		}

		const currentPhase = queryPhase(event.action);
		if (currentPhase === null || !API_QUERY_TOAST_POLICY[currentPhase]) {
			return;
		} else if (isRecovering(event.query)) {
			return;
		}

		reportApiToast({
			id: `query:${event.query.queryHash}`,
			key: readCacheKey(event.query.queryKey),
			phase: currentPhase,
			error: readActionError(event.action),
		});
	}, []);

	const onMutationEvent = useCallback((event: MutationCompareArgument) => {
		if (event.type !== 'updated') {
			return;
		}

		const currentPhase = mutationPhase(event.action);
		if (currentPhase === null || !API_MUTATION_TOAST_POLICY[currentPhase]) {
			return;
		}

		const cacheKey = readCacheKey(event.mutation.options.mutationKey);
		if (isSilentMutation(cacheKey)) {
			return;
		}

		reportApiToast({
			id: `mutation:${String(event.mutation.mutationId)}`,
			key: cacheKey,
			phase: currentPhase,
			error: readActionError(event.action),
		});
	}, []);

	useEffect(() => {
		const unsubscribeQueries = queryClient.getQueryCache().subscribe(onQueryEvent);
		const unsubscribeMutations = queryClient.getMutationCache().subscribe(onMutationEvent);

		return () => {
			unsubscribeQueries();
			unsubscribeMutations();
		};
	}, [queryClient, onQueryEvent, onMutationEvent]);
};

export { useApiToasts };
