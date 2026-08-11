interface AssistantSignalDto {
	label: string;
	value: string;
	tone: 'pos' | 'neg' | 'neutral' | 'muted';
}

interface AssistantMessageDto {
	id: string;
	role: 'assistant' | 'user';
	text: string;
	refs?: string[];
}

interface AssistantContentDto {
	signals: AssistantSignalDto[];
	chat: AssistantMessageDto[];
	prompts: string[];
}

interface IAssistantRESTApiClient {
	getContent: (request: AssistantContentGetRequest) => Promise<AssistantContentGetResponse>
}

interface AssistantContentGetRequest { params: object }
type AssistantContentGetResponse = AssistantContentDto;

export type {
	AssistantSignalDto,
	AssistantMessageDto,
	AssistantContentDto,
	IAssistantRESTApiClient,
	AssistantContentGetRequest,
	AssistantContentGetResponse,
};
