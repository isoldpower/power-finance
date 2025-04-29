import {useMutationState} from "@tanstack/react-query";
import {useMemo} from "react";

interface UseWalletMutationsStateReturn {
	isMutating: boolean;
	isDeleting: boolean;
	isUpdating: boolean;
	isReplacing: boolean;
}

const useWalletMutationsState = (id: string) => {
	const deletingMutations = useMutationState({
		filters: { mutationKey: ['deleteWallet', id], status: 'pending' }
	});
	const updatingMutations = useMutationState({
		filters: { mutationKey: ['updateWallet', id], status: 'pending' }
	});
	const replacingMutations = useMutationState({
		filters: { mutationKey: ['replaceWallet', id], status: 'pending' }
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
