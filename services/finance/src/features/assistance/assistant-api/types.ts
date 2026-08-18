import type { PageParams } from "@shared/api";
import type { ActionResourceRefDto } from "@feature/assistance/actions-api";


type SignalToneDto = 'positive' | 'negative' | 'neutral' | 'muted';

type MessageRoleDto = 'user' | 'assistant';

type MessageStatusDto = 'complete' | 'streaming' | 'failed';

interface AssistantSignalDto {
	label: string;
	value: string;
	tone: SignalToneDto;
}

interface AssistantOverviewDto {
	signals: AssistantSignalDto[];
	prompts: string[];
}

interface AssistantMessageDto {
	id: string;
	created_at: string;
	role: MessageRoleDto;
	status: MessageStatusDto;
	text: string;
	refs: ActionResourceRefDto[];
}

interface AssistantAcceptedDto {
	user_message_id: string;
	message_id: string;
}

interface AssistantDeltaDto {
	text: string;
}

interface AssistantClearedDto {
	deleted: number;
}

interface AssistantSendBody {
	text: string;
}

type AssistantMessagesParams = PageParams;

export type {
	AssistantAcceptedDto,
	AssistantClearedDto,
	AssistantDeltaDto,
	AssistantMessageDto,
	AssistantMessagesParams,
	AssistantOverviewDto,
	AssistantSendBody,
	AssistantSignalDto,
	MessageRoleDto,
	MessageStatusDto,
	SignalToneDto,
};
