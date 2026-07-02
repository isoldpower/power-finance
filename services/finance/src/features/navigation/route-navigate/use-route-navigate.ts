import { useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { getFinanceRoute } from "@internal/shared";

import type { FinanceRouteKey } from "../route-link/RouteLink.tsx";

const useRouteNavigate = () => {
	const navigate = useNavigate();

	return useCallback((to: FinanceRouteKey) => {
		void navigate({ to: getFinanceRoute(to) });
	}, [navigate]);
};

export { useRouteNavigate };
