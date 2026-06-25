import { useApiContext } from "@app/api/useContext.ts";
import { useEffect, useMemo, useState } from "react";
import type { CategoriesAnalyticsResponse } from "@feature/analytics";


export function useCategoryData() {
	const { analyticsClients } = useApiContext();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<CategoriesAnalyticsResponse>([]);
	const restClient = useMemo(() => analyticsClients.rest, [analyticsClients]);

	useEffect(() => {
		restClient.getCategoryDataset({})
			.then((response) => {
				setData(response);
			})
			.catch((error: unknown) => {
				console.error(error);
				setError(error as string);
			})
			.finally(() => {
				setIsLoading(false);
			})
	}, [restClient]);
	
	return useMemo(() => ({
		data,
		isLoading,
		error,
	}), [isLoading, data, error]);
}