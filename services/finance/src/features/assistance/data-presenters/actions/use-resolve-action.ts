import { useApiContext } from "@app/api";
import { useResourceMutation } from "@shared/data";
import { resolveAction } from "../../assistance-api/actions";
import { ACTIONS_CACHE_KEYS } from "../cache-config.ts";
import type { ActionResolveResponse, ListActionsResponse } from "../../assistance-api/actions";


const useResolveAction = () => {
	const apiContext = useApiContext();

	return useResourceMutation<string, ActionResolveResponse, ListActionsResponse>({
		key: [ACTIONS_CACHE_KEYS.resolve],
		mutate: (id) => resolveAction({ handler: apiContext.actionServers.rest, id }),
		optimistic: {
			key: [ACTIONS_CACHE_KEYS.list],
			apply: (previous, id) => previous
				? {
					...previous,
					data: previous.data.filter((action) => action.id !== id),
					meta: { ...previous.meta, total: Math.max(0, previous.meta.total - 1) },
				}
				: previous,
		},
	});
};

export { useResolveAction };
