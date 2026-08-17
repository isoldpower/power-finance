import type { ActionQuery } from "@entity/assistance";
import type { ActionListParams } from "../types.ts";

const actionQueryToApi = (query: ActionQuery | undefined): ActionListParams => ({
	...(query?.status === undefined ? {} : { status: query.status }),
	...(query?.source === undefined ? {} : { source: query.source }),
	...(query?.severity === undefined ? {} : { severity: query.severity }),
});

export { actionQueryToApi };
