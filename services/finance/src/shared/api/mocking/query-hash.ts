import { stringifySorted } from "@shared/data";


const stringifySortedQuery = (query: object): string => {
	return btoa(stringifySorted(query)).replace(/=+$/, '');
};

export { stringifySortedQuery };
