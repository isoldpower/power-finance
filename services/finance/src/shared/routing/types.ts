import {getFinanceRoute} from "@internal/shared";


type FinanceRouteKey = Parameters<typeof getFinanceRoute>[0];


type RouteSearch = Record<string, string | number | boolean | undefined>;

export type { FinanceRouteKey, RouteSearch };