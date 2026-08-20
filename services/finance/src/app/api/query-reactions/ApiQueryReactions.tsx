import { useMemo } from 'react';

import { useTransactionPostReaction } from './use-transaction-post-reaction.ts';
import { useWalletDeleteReaction } from './use-wallet-delete-reaction.ts';
import { useQueryReactions } from './use-query-reactions.ts';

import type { FC } from 'react';


const ApiQueryReactions: FC = () => {
	const transactionPostReaction = useTransactionPostReaction();
	const walletDeleteReaction = useWalletDeleteReaction();

	const mutationReactions = useMemo(() => [
		transactionPostReaction,
		walletDeleteReaction,
	], [transactionPostReaction, walletDeleteReaction]);

	useQueryReactions([], mutationReactions);

	return null;
};

ApiQueryReactions.displayName = 'ApiQueryReactions';

export { ApiQueryReactions };
