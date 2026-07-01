import { useMemo } from "react";
import { useSearchTyped } from "./use-search-typed.ts";
import type { ZodObject, ZodRawShape } from "zod";
import type { SetSearch } from "./types";


const useSearchProtected = <T extends object>(
	validationSchema: ZodObject<ZodRawShape>,
): [T, SetSearch<T>] => {
	const [typedSearch, setTypedSearch] = useSearchTyped<T>(validationSchema);
	if (!typedSearch.success) {
		throw new Error(
			`Invalid search params specified for page: 
			${typedSearch.error?.message ?? 'Unknown error'}`
		);
	}

	const actualSearch = useMemo(() => {
		if (!typedSearch.search) {
			throw new Error('Search params specified but failed to retrieve search');
		}

		return typedSearch.search;
	}, [typedSearch]);

	return [actualSearch, setTypedSearch];
}

export { useSearchProtected };