import type { EventCategory, EventName } from "./types.ts";


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

export { API_NAME_BY_EVENT, EVENT_BY_API_NAME, EVENT_CATEGORIES, EVENT_NAMES };
