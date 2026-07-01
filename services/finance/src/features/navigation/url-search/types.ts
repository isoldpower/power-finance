interface TypedSearchResult<T> {
	error: Error | null;
	success: boolean;
	search: T | null;
}

type SetSearch<T> = (params: Partial<T>) => void;

export type { SetSearch, TypedSearchResult };