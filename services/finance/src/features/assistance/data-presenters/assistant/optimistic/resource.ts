import { ASSISTANT_CACHE_KEYS } from "../../cache-config.ts";

import type { OptimisticResource } from "@shared/data";
import type { AssistantMessage } from "@entity/assistance";


const MESSAGE_RESOURCE: OptimisticResource<AssistantMessage, never, never> = {
	paged: [{ key: ASSISTANT_CACHE_KEYS.messages }],
};

export { MESSAGE_RESOURCE };
