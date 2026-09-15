import type { CachesSnapshot } from "@shared/data";
import type { AssistantMessage } from "@entity/assistance";


type MessageCachesSnapshot = CachesSnapshot<AssistantMessage, never>;

export type { MessageCachesSnapshot };
