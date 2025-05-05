import { useMutationState } from "@tanstack/react-query";
import { useMemo } from "react";

import { CACHE_KEYS } from "./config.ts";


interface UseWalletMutationsStateReturn {
	isMutating: boolean;
	isDeleting: boolean;
	isUpdating: boolean;
	isReplacing: boolean;
}

const useWalletMutationsState = (id: string) => {
	const deletingMutations = useMutationState({
		filters: { mutationKey: [CACHE_KEYS.delete, id], status: 'pending' }
	});
	const updatingMutations = useMutationState({
		filters: { mutationKey: [CACHE_KEYS.update, id], status: 'pending' }
	});
	const replacingMutations = useMutationState({
		filters: { mutationKey: [CACHE_KEYS.replace, id], status: 'pending' }
	});

	const isMutating = useMemo(() => {
		return deletingMutations.length > 0 ||
			updatingMutations.length > 0 ||
			replacingMutations.length > 0;
	}, [deletingMutations, updatingMutations, replacingMutations]);

	return useMemo(() => ({
		isMutating,
		isDeleting: deletingMutations.length > 0,
		isUpdating: updatingMutations.length > 0,
		isReplacing: replacingMutations.length > 0,
	}), [isMutating, deletingMutations, updatingMutations, replacingMutations]);
}

export { useWalletMutationsState };
export type { UseWalletMutationsStateReturn };
