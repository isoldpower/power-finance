import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";


interface QueryReaction {
	compare: (keys: unknown[]) => boolean;
	reaction: (data: unknown) => void;
}

const useQueryReactions = (reactions: QueryReaction[]) => {
	const queryClient = useQueryClient();

	useEffect(() => {
		const unsubscribe = queryClient.getQueryCache().subscribe((query) => {
			if (query.type === 'updated') reactions.map((reaction) => {
				if (Array.isArray(query.query.queryKey) && reaction.compare(query.query.queryKey)) {
					reaction.reaction(query.query.state.data);
				}
			});
		})

		return () => { unsubscribe(); };
	}, [queryClient, reactions]);
}

export { useQueryReactions };
export type { QueryReaction };