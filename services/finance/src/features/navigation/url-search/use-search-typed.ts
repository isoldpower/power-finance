import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback, useMemo } from "react";
import { ZodError } from "zod";

import type { ZodObject, ZodRawShape } from "zod";
import type { SetSearch, TypedSearchResult } from "./types";


function validateSearch(
	validationSchema: ZodObject<ZodRawShape>,
	search: unknown,
): object | ZodError {
	try {
		return validationSchema.parse(search) as object;
	} catch (error: unknown) {
		return error as ZodError;
	}
}

const useSearchTyped = <T extends object>(
	validationSchema: ZodObject<ZodRawShape>,
): [TypedSearchResult<T>, SetSearch<T>] => {
	const search = useSearch({ strict: false });
	const navigate = useNavigate();
	const validatedSearch = useMemo<T | ZodError>(() => {
		return validateSearch(validationSchema, search) as T;
	}, [search, validationSchema]);
	
	const parsedSearch = useMemo(() => {			
		if (validatedSearch instanceof ZodError) {
			return {
				error: validatedSearch,
				success: false,
				search: null,
			} satisfies TypedSearchResult<T>;
		}
		
		return {
			error: null,
			success: true,
			search: validatedSearch
		} satisfies TypedSearchResult<T>;
	}, [validatedSearch]);
	
	const setParsedSearch = useCallback((overrideParams: Partial<T>) => {
		navigate({
			to: '.',
			replace: true,
			search: (params) => ({
				...params,
				...overrideParams,
			}),
		}).catch((error: unknown) => {
			console.error(error);
		});
	}, [navigate]);
	
	return [parsedSearch, setParsedSearch];
}

export { useSearchTyped };
