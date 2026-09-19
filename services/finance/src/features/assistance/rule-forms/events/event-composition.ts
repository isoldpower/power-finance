import { API_NAME_BY_EVENT, EVENT_BY_API_NAME } from "./constants.ts";

import type { AutomationEvent } from "@entity/assistance";
import type { EventCategory, EventName } from "./types.ts";


function composeEvent(category: EventCategory, name: EventName | ''): AutomationEvent | '' {
	if (name === '') return '';

	return `${category}.${API_NAME_BY_EVENT[name]}` as AutomationEvent;
}

function splitEvent(event: AutomationEvent | null): { category: EventCategory; name: EventName | '' } {
	if (event === null) return { category: 'transaction', name: '' };

	const [category, apiName] = event.split('.');

	return {
		category: category as EventCategory,
		name: EVENT_BY_API_NAME[apiName] ?? '',
	};
}

export { composeEvent, splitEvent };
