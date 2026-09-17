import { useRouterState } from "@tanstack/react-router";

import type { RouteSearch } from "../types.ts";


const useRouteSearch = (): RouteSearch => useRouterState({
	select: (state) => state.location.search as RouteSearch,
});

export { useRouteSearch };
