import { useMemo } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSettingsContext } from "@internal/shared";
import { useApiContext } from "@app/api";
import { getDimensions } from "../ledger-api";
import { FILTERS_CACHE_KEYS } from "./cache-config.ts";

import type { UseQueryResult } from "@tanstack/react-query";
import type { Dimensions } from "@entity/filters";


type UseDimensionsReturn = UseQueryResult<Dimensions> & {
	dimensions: Dimensions | undefined;
};

const useDimensions = (): UseDimensionsReturn => {
	const { ledgerServers } = useApiContext();
	const { mainCurrency } = useSettingsContext();

	const query = useQuery({
		queryKey: [FILTERS_CACHE_KEYS.dimensions, mainCurrency],
		queryFn: () => getDimensions({
			handler: ledgerServers.rest,
			currency: mainCurrency
		}),
		placeholderData: keepPreviousData,
	});

	return useMemo(() => ({ 
		...query,
		dimensions: query.data
	}), [query]);
};

export { useDimensions };
export type { UseDimensionsReturn };
