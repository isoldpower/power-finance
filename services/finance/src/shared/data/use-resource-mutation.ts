import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { QueryKey, UseMutationResult } from "@tanstack/react-query";


interface OptimisticConfig<TVars, TCache> {
	key: QueryKey;
	apply: (previous: TCache | undefined, variables: TVars) => TCache | undefined;
}

interface ResourceMutationConfig<TVars, TResult, TCache> {
	key: QueryKey;
	mutate: (variables: TVars) => Promise<TResult>;
	invalidates?: QueryKey[];
	optimistic?: OptimisticConfig<TVars, TCache>;
	onSuccess?: (result: TResult, variables: TVars) => void;
}

interface OptimisticContext<TCache> {
	snapshot: [QueryKey, TCache | undefined][];
}

const useResourceMutation = <TVars, TResult, TCache = unknown>(
	config: ResourceMutationConfig<TVars, TResult, TCache>
): UseMutationResult<TResult, Error, TVars, OptimisticContext<TCache>> => {
	const client = useQueryClient();
	const { key, mutate, invalidates, optimistic, onSuccess } = config;

	return useMutation<TResult, Error, TVars, OptimisticContext<TCache>>({
		mutationKey: key,
		mutationFn: mutate,
		onMutate: optimistic
			? async (variables) => {
				await client.cancelQueries({ queryKey: optimistic.key });
				const snapshot = client.getQueriesData<TCache>({ queryKey: optimistic.key });
				client.setQueriesData<TCache>(
					{ queryKey: optimistic.key },
					(previous) => optimistic.apply(previous, variables)
				);
				return { snapshot };
			}
			: undefined,
		onError: optimistic
			? (_error, _variables, context) => {
				for (const [entryKey, data] of context?.snapshot ?? []) {
					client.setQueryData(entryKey, data);
				}
			}
			: undefined,
		onSuccess,
		onSettled: () => {
			if (optimistic) void client.invalidateQueries({ queryKey: optimistic.key });
			for (const derivedKey of invalidates ?? []) {
				void client.invalidateQueries({ queryKey: derivedKey });
			}
		},
	});
};

export { useResourceMutation };
export type { ResourceMutationConfig, OptimisticConfig };
