import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface QueryReaction {
	compare: (keys: string[]) => boolean;
	reaction: (data: any) => void;
}

const useQueryReactions = (reactions: QueryReaction[]) => {
	const queryClient = useQueryClient();

	useEffect(() => {
		const unsubscribe = queryClient.getQueryCache().subscribe((query) => {
			if (query.type === 'updated') reactions.map((reaction) => {
				if (reaction.compare(query.query.queryKey)) {
					reaction.reaction(query.query.state.data);
				}
			});
		})

		return () => unsubscribe();
	}, []);
}

export { useQueryReactions };
export type { QueryReaction };