import { stringifySorted } from "../../data/index.ts";


function stringifySortedQuery(query: object): string {
	return btoa(stringifySorted(query))
		.replace(/=+$/, '');
}

export { stringifySortedQuery };
