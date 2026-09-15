import { matchesAutomationQuery } from "../../../filtration";
import { AUTOMATIONS_CACHE_KEYS } from "../../cache-config.ts";

import type { QueryKey } from "@tanstack/react-query";
import type { OptimisticResource } from "@shared/data";
import type { Automation, AutomationSearchQuery } from "@entity/assistance";


const accepts = (key: QueryKey, automation: Automation): boolean => {
	const [, enabled] = key;

	return typeof enabled !== 'boolean' || enabled === automation.enabled;
};

const MATCH_ALL: AutomationSearchQuery = {};

const searchQueryOf = (key: QueryKey): AutomationSearchQuery => {
	const [, query] = key;

	return typeof query === 'object' && query !== null
		? query as AutomationSearchQuery
		: MATCH_ALL;
};

const AUTOMATION_RESOURCE: OptimisticResource<Automation, Automation, Automation> = {
	paged: [
		{ key: AUTOMATIONS_CACHE_KEYS.list, accepts },
		{
			key: AUTOMATIONS_CACHE_KEYS.search,
			accepts: (key, automation) => matchesAutomationQuery(automation, searchQueryOf(key)),
		},
	],
	details: [
		{
			key: AUTOMATIONS_CACHE_KEYS.fetch,
			read: (response) => response,
			write: (_response, automation) => automation,
		},
	],
};

export { AUTOMATION_RESOURCE };
