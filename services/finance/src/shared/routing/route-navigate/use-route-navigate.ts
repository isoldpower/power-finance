import { useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { getFinanceRoute } from "@internal/shared";

import type { FinanceRouteKey } from "../types.ts";


const useRouteNavigate = () => {
	const navigate = useNavigate();

	return useCallback((to: FinanceRouteKey, search?: Record<string, string>) => {
		void navigate({ to: getFinanceRoute(to), search });
	}, [navigate]);
};

export { useRouteNavigate };
