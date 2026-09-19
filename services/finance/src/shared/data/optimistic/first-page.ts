import type { QueryKey } from "@tanstack/react-query";


const FIRST_CURSOR = 'first';

const isFirstPage = (key: QueryKey): boolean => {
	return key.at(-1) === FIRST_CURSOR;
}


export { FIRST_CURSOR, isFirstPage };
