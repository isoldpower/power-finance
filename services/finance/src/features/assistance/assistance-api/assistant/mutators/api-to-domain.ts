import type { AssistantContentDto } from "../types.ts";
import type { AssistantContent } from "@entity/assistance";


const assistantContentFromApi = (dto: AssistantContentDto): AssistantContent => ({
	signals: dto.signals.map((signal) => ({ ...signal })),
	chat: dto.chat.map((message) => ({ ...message })),
	prompts: [...dto.prompts],
});

export { assistantContentFromApi };
