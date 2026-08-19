import { stringifySorted } from "@shared/data";


function stringifySortedQuery(query: object): string {
	return btoa(stringifySorted(query))
		.replace(/=+$/, '');
}

export { stringifySortedQuery };
