import type { AutomationEvent } from "@entity/assistance";


type EventCategory = 'transaction';
type EventName = 'created' | 'changed';

const EVENT_CATEGORIES: EventCategory[] = ['transaction'];
const EVENT_NAMES: EventName[] = ['created', 'changed'];

const API_NAME_BY_EVENT: Record<EventName, string> = {
	created: 'created',
	changed: 'updated',
};

const EVENT_BY_API_NAME: Record<string, EventName> = {
	created: 'created',
	updated: 'changed',
};

const composeEvent = (
	category: EventCategory,
	name: EventName | '',
): AutomationEvent | '' => (
	name === '' ? '' : `${category}.${API_NAME_BY_EVENT[name]}` as AutomationEvent
);

const splitEvent = (
	event: AutomationEvent | null,
): { category: EventCategory; name: EventName | '' } => {
	if (event === null) return { category: 'transaction', name: '' };

	const [category, apiName] = event.split('.');

	return {
		category: category as EventCategory,
		name: EVENT_BY_API_NAME[apiName] ?? '',
	};
};

export { composeEvent, splitEvent, EVENT_CATEGORIES, EVENT_NAMES };
export type { EventCategory, EventName };
