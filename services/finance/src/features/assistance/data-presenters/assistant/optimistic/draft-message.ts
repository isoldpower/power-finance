import { v4 as uuidv4 } from "uuid";

import type { AssistantMessage, ResourceRef } from "@entity/assistance";


const OPTIMISTIC_ID_PREFIX = 'optimistic';

const NO_REFS: ResourceRef[] = [];

const optimisticMessageId = (): string => `${OPTIMISTIC_ID_PREFIX}:${uuidv4()}`;

const messageFromText = (text: string, id: string, createdAt: string): AssistantMessage => ({
	id,
	createdAt,
	role: 'user',
	status: 'complete',
	text,
	refs: NO_REFS,
});

export { messageFromText, optimisticMessageId };
