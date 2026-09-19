import type { WebhookEventType } from "../types.ts";


interface WebhookEventGroupView {
	subject: string;
	events: WebhookEventType[];
}

const webhookEventGroups = (eventTypes: WebhookEventType[]): WebhookEventGroupView[] => {
	const bySubject = new Map<string, WebhookEventType[]>();

	for (const eventType of eventTypes) {
		const group = bySubject.get(eventType.subject);

		if (group === undefined) {
			bySubject.set(eventType.subject, [eventType]);
		} else {
			group.push(eventType);
		}
	}

	return [...bySubject].map(([subject, events]) => ({ 
		subject,
		events,
	}));
};

export { webhookEventGroups };
export type { WebhookEventGroupView };
