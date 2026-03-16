import { useTransactionPostReaction } from './use-transaction-post-reaction.ts';
import { useWalletDeleteReaction } from "./use-wallet-delete-reaction.ts";
import { useQueryReactions } from './use-query-reactions.ts';
import { useMemo } from 'react';

export const ApiQueryReactions = () => {
	const transactionPostReaction = useTransactionPostReaction();
	const walletDeleteReaction = useWalletDeleteReaction();

	const mutationReactions = useMemo(() => [
		transactionPostReaction,
		walletDeleteReaction
	], [transactionPostReaction, walletDeleteReaction]);

	useQueryReactions([], mutationReactions);

	return undefined;
};
