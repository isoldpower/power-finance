import { useRouterState } from "@tanstack/react-router";


const useRoutePathname = (): string => useRouterState({
	select: (state) => state.location.pathname,
});

export { useRoutePathname };
