import { useCallback, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type {
	MutationReaction,
	MutationCompareArgument,
	MutationSubscribeCallback,
	QueryReaction,
	SubscribeCallback
} from "./types";


const useQueryReactions = (
	queryReactions: QueryReaction[],
	mutationReactions: MutationReaction[] = []
) => {
	const queryReactionsRef = useRef(queryReactions);
	const mutationReactionsRef = useRef(mutationReactions);
	const queryClient = useQueryClient();

	useEffect(() => {
		queryReactionsRef.current = queryReactions;
		mutationReactionsRef.current = mutationReactions;
	}, [queryReactions, mutationReactions]);
	
	const queryCacheCallback = useCallback<SubscribeCallback>((event) => {
		if (event.type !== 'updated' || event.action.type !== 'success') {
			return;
		}

		queryReactionsRef.current.forEach((reaction) => {
			if (reaction.compare(event)) {
				reaction.reaction(event.query.state.data);
			}
		});
	}, []);

	const mutationCacheCallback = useCallback<MutationSubscribeCallback>((event) => {
		if (event.type !== 'updated' || event.action.type !== 'success') {
			return;
		}

		mutationReactionsRef.current.forEach((reaction) => {
			if (reaction.compare(event)) {
				reaction.reaction(event.mutation.state.data);
			}
		});
	}, []);

	useEffect(() => {
		const queryCache = queryClient.getQueryCache();
		const unsubscribeQuery = queryCache.subscribe(queryCacheCallback);

		const mutationCache = queryClient.getMutationCache();
		const unsubscribeMutation = mutationCache.subscribe(mutationCacheCallback);

		return () => {
			unsubscribeQuery();
			unsubscribeMutation();
		};
	}, [queryCacheCallback, mutationCacheCallback, queryClient]);
}

export type { MutationReaction, MutationCompareArgument };
export { useQueryReactions };
