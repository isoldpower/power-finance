import { useMutationState } from "@tanstack/react-query";
import { useMemo } from "react";

import { CACHE_KEYS } from "./config.ts";


interface UseTransactionMutationsStateReturn {
	isMutating: boolean;
	isDeleting: boolean;
	isReplacing: boolean;
}

const useTransactionMutationsState = (id: string) => {
	const deletingMutations = useMutationState({
		filters: { mutationKey: [CACHE_KEYS.delete, id], status: 'pending' }
	});
	const replacingMutations = useMutationState({
		filters: { mutationKey: [CACHE_KEYS.replace, id], status: 'pending' }
	});

	const isMutating = useMemo(() => {
		return deletingMutations.length > 0 ||
			replacingMutations.length > 0;
	}, [deletingMutations, replacingMutations]);

	return useMemo(() => ({
		isMutating,
		isDeleting: deletingMutations.length > 0,
		isReplacing: replacingMutations.length > 0,
	}), [isMutating, deletingMutations, replacingMutations]);
}

export { useTransactionMutationsState };
export type { UseTransactionMutationsStateReturn };
