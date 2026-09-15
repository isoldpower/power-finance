import { ACTIONS_CACHE_KEYS } from "../../cache-config.ts";

import type { QueryKey } from "@tanstack/react-query";
import type { OptimisticResource } from "@shared/data";
import type { Action } from "@entity/assistance";


const ANY = 'any';

const matchesSegment = (segment: unknown, value: string): boolean => (
	segment === ANY || segment === value
);

const accepts = (key: QueryKey, action: Action): boolean => {
	const [, status, source, severity] = key;

	return matchesSegment(status, action.status)
		&& matchesSegment(source, action.source)
		&& matchesSegment(severity, action.severity);
};

const ACTION_RESOURCE: OptimisticResource<Action, never, never> = {
	paged: [{ key: ACTIONS_CACHE_KEYS.list, accepts }],
};

export { ACTION_RESOURCE };
