import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useApiContext, DERIVED_KEYS } from "@app/api";
import { clearAssistantMessages } from "../../assistant-api";
import { ASSISTANT_CACHE_KEYS } from "../cache-config.ts";

const useClearAssistantMessages = () => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: [ASSISTANT_CACHE_KEYS.clear],
		mutationFn: () => clearAssistantMessages({ handler: apiContext.assistantServers.rest }),
		onSettled: () => {
			for (const key of DERIVED_KEYS.onAssistantChange) {
				void queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});
};

export { useClearAssistantMessages };
