import { useTransactionPostReaction } from './use-transaction-post-reaction.tsx';
import { useQueryReactions } from './use-query-reactions.ts';

export const ApiQueryReactions = () => {
	useQueryReactions([
		useTransactionPostReaction()
	]);

	return undefined;
};
