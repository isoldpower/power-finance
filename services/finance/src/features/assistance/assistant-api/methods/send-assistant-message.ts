import { assistantMessageFromApi, assistantQuotaFromApi } from "../mutators";

import type { AssistantReply } from "@entity/assistance";
import type { IAssistantRESTApiClient } from "../rest-client";


interface SendAssistantMessageRequest {
	handler: Pick<IAssistantRESTApiClient, 'send'>;
	text: string;
	idempotencyKey?: string;
	onAccepted?: (userMessageId: string, messageId: string) => void;
	onDelta?: (text: string) => void;
	signal?: AbortSignal;
}

type SendAssistantMessageResponse = AssistantReply;

async function sendAssistantMessage(
	request: SendAssistantMessageRequest
): Promise<SendAssistantMessageResponse> {
	let userMessageId = '';
	let messageId = '';

	const reply = await request.handler.send({
		data: { text: request.text },
		idempotencyKey: request.idempotencyKey,
		signal: request.signal,
		onAccepted: (accepted) => {
			userMessageId = accepted.user_message_id;
			messageId = accepted.message_id;
			request.onAccepted?.(accepted.user_message_id, accepted.message_id);
		},
		onDelta: (delta) => { 
			request.onDelta?.(delta.text);
		},
	});

	return {
		userMessageId,
		messageId: messageId || reply.message.id,
		message: assistantMessageFromApi(reply.message),
		quota: reply.quota === null ? null : assistantQuotaFromApi(reply.quota),
	};
}

export { sendAssistantMessage };
export type { SendAssistantMessageRequest, SendAssistantMessageResponse };
