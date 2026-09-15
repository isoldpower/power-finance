import { useCallback, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { dropFromPage, prependToPage, swapInPage } from "../page-writers.ts";
import { isFirstPage } from "./first-page.ts";
import { clearPending, markPending } from "./pending.ts";

import type { QueryClient, QueryKey } from "@tanstack/react-query";
import type { Page } from "@shared/api";
import type { Identified } from "../page-writers.ts";
import type {
	CacheEntry,
	CachesSnapshot,
	DetailFamily,
	OptimisticCache,
	OptimisticResource,
	PagedFamily,
	PagedResponse,
} from "./types.ts";


const accepts = <TItem>(family: PagedFamily<TItem>, key: QueryKey, item: TItem): boolean => (
	family.accepts === undefined || family.accepts(key, item)
);

const opensPage = <TItem>(family: PagedFamily<TItem>, key: QueryKey): boolean => (
	family.isFirstPage === undefined ? isFirstPage(key) : family.isFirstPage(key)
);

const readPaged = <TItem>(
	client: QueryClient,
	families: PagedFamily<TItem>[],
): [PagedFamily<TItem>, CacheEntry<PagedResponse<TItem>>][] => families.flatMap((family) => (
	client
		.getQueriesData<PagedResponse<TItem>>({ queryKey: [family.key] })
		.map((entry): [PagedFamily<TItem>, CacheEntry<PagedResponse<TItem>>] => [family, entry])
));

const readDetails = <TDetailItem, TDetail>(
	client: QueryClient,
	families: DetailFamily<TDetailItem, TDetail>[],
): CacheEntry<TDetail>[] => families.flatMap((family) => (
	client.getQueriesData<TDetail>({ queryKey: [family.key] })
));

const readSingles = (client: QueryClient, keys: string[]): CacheEntry<unknown>[] => keys.map(
	(key): CacheEntry<unknown> => [[key], client.getQueryData([key])],
);

const restoreEntries = <TResponse>(
	client: QueryClient,
	entries: CacheEntry<TResponse>[],
): void => {
	for (const [key, response] of entries) {
		client.setQueryData(key, response);
	}
};

type Stamp = <TValue extends object>(value: TValue) => TValue;

const useOptimisticCache = <TItem extends Identified, TDetailItem extends object, TDetail>(
	resource: OptimisticResource<TItem, TDetailItem, TDetail>,
): OptimisticCache<TItem, TDetailItem, TDetail> => {
	const client = useQueryClient();
	const { paged, details = [], singles = [] } = resource;

	const capture = useCallback(async (): Promise<CachesSnapshot<TItem, TDetail>> => {
		const families = [...paged.map((family) => family.key), ...details.map((family) => family.key)];
		await Promise.all(families.map((key) => client.cancelQueries({ queryKey: [key] })));

		return {
			paged: readPaged(client, paged).map(([, entry]) => entry),
			details: readDetails(client, details),
			singles: readSingles(client, singles),
		};
	}, [client, paged, details, singles]);

	const restore = useCallback((snapshot: CachesSnapshot<TItem, TDetail> | undefined): void => {
		if (snapshot === undefined) return;

		restoreEntries(client, snapshot.paged);
		restoreEntries(client, snapshot.details);
		restoreEntries(client, snapshot.singles);
	}, [client]);

	const writePaged = useCallback((
		project: (page: Page<TItem>, family: PagedFamily<TItem>, key: QueryKey) => Page<TItem>,
	): void => {
		for (const [family, [key, response]] of readPaged(client, paged)) {
			if (response === undefined) continue;

			client.setQueryData<PagedResponse<TItem>>(key, {
				...response,
				page: project(response.page, family, key),
			});
		}
	}, [client, paged]);

	const writePagedItem = useCallback((
		id: string,
		project: (item: TItem) => TItem,
		stamp: Stamp,
	): void => {
		writePaged((page, family, key) => {
			const current = page.items.find((item) => item.id === id);
			if (current === undefined) return page;

			const next = stamp(project(current));

			return accepts(family, key, next)
				? swapInPage(page, id, next)
				: dropFromPage(page, id);
		});
	}, [writePaged]);

	const writeInsertedItems = useCallback((items: TItem[], stamp: Stamp): void => {
		writePaged((page, family, key) => [...items].reverse().reduce((next, item) => (
			opensPage(family, key) && accepts(family, key, item)
				? prependToPage(next, stamp(item))
				: next
		), page));
	}, [writePaged]);

	const writeDetails = useCallback((
		id: string,
		project: (item: TDetailItem) => TDetailItem,
		stamp: Stamp,
	): void => {
		for (const family of details) {
			client.setQueryData<TDetail>([family.key, id], (response) => (
				response === undefined
					? response
					: family.write(response, stamp(project(family.read(response))))
			));
		}
	}, [client, details]);

	const patchPaged = useCallback((id: string, project: (item: TItem) => TItem): void => {
		writePagedItem(id, project, markPending);
	}, [writePagedItem]);

	const insertPaged = useCallback((items: TItem[]): void => {
		writeInsertedItems(items, markPending);
	}, [writeInsertedItems]);

	const removePaged = useCallback((ids: string[]): void => {
		writePaged((page) => ids.reduce((next, id) => dropFromPage(next, id), page));
	}, [writePaged]);

	const settlePaged = useCallback((id: string, item: TItem): void => {
		writePagedItem(id, () => item, clearPending);
	}, [writePagedItem]);

	const settleInserted = useCallback((items: TItem[]): void => {
		writeInsertedItems(items, clearPending);
	}, [writeInsertedItems]);

	const patchDetails = useCallback((
		id: string,
		project: (item: TDetailItem) => TDetailItem,
	): void => {
		writeDetails(id, project, markPending);
	}, [writeDetails]);

	const settleDetails = useCallback((
		id: string,
		project: (item: TDetailItem) => TDetailItem,
	): void => {
		writeDetails(id, project, clearPending);
	}, [writeDetails]);

	const patchSingle = useCallback(<TData,>(
		key: string,
		project: (data: TData) => TData,
	): void => {
		client.setQueryData<TData>([key], (data) => (data === undefined ? data : project(data)));
	}, [client]);

	return useMemo(() => ({
		client,
		capture,
		restore,
		patchPaged,
		patchDetails,
		patchSingle,
		insertPaged,
		removePaged,
		settlePaged,
		settleInserted,
		settleDetails,
	}), [
		client,
		capture,
		restore,
		patchPaged,
		patchDetails,
		patchSingle,
		insertPaged,
		removePaged,
		settlePaged,
		settleInserted,
		settleDetails,
	]);
};

export { useOptimisticCache };
