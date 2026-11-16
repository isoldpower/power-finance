import { iso } from "./dto.ts";
import { UNCATEGORIZED_TOKEN } from "../../types.ts";

import type { AnalyticsMetaDto } from "../../types.ts";
import type { LedgerQuery } from "./types.ts";


const analyticsMeta = (query: LedgerQuery): AnalyticsMetaDto => ({
	since: iso(query.since),
	until: iso(query.until),
	currency: query.currency,
	timezone: query.timezone,
	wallet_ids: query.walletIds,
	categories: query.categories?.map((category) => category ?? UNCATEGORIZED_TOKEN) ?? null,
	generated_at: new Date().toISOString(),
	cached: false,
});

export { analyticsMeta };
