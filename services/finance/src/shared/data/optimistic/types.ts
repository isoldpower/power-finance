import type { QueryClient, QueryKey } from "@tanstack/react-query";
import type { Page } from "@shared/api";
import type { Identified } from "../page-writers.ts";


interface PagedResponse<TItem> {
	page: Page<TItem>;
}

type CacheEntry<TResponse> = [QueryKey, TResponse | undefined];

interface CachesSnapshot<TItem, TDetail> {
	paged: CacheEntry<PagedResponse<TItem>>[];
	details: CacheEntry<TDetail>[];
	singles: CacheEntry<unknown>[];
}

interface PagedFamily<TItem> {
	key: string;
	accepts?: (key: QueryKey, item: TItem) => boolean;
	isFirstPage?: (key: QueryKey) => boolean;
}

interface DetailFamily<TDetailItem, TDetail> {
	key: string;
	read: (response: TDetail) => TDetailItem;
	write: (response: TDetail, item: TDetailItem) => TDetail;
}

interface OptimisticResource<TItem, TDetailItem extends object, TDetail> {
	paged: PagedFamily<TItem>[];
	details?: DetailFamily<TDetailItem, TDetail>[];
	singles?: string[];
}

interface OptimisticCache<TItem extends Identified, TDetailItem extends object, TDetail> {
	client: QueryClient;
	capture: () => Promise<CachesSnapshot<TItem, TDetail>>;
	restore: (snapshot: CachesSnapshot<TItem, TDetail> | undefined) => void;
	patchPaged: (id: string, project: (item: TItem) => TItem) => void;
	patchDetails: (id: string, project: (item: TDetailItem) => TDetailItem) => void;
	patchSingle: <TData>(key: string, project: (data: TData) => TData) => void;
	insertPaged: (items: TItem[]) => void;
	removePaged: (ids: string[]) => void;
	settlePaged: (id: string, item: TItem) => void;
	settleInserted: (items: TItem[]) => void;
	settleDetails: (id: string, project: (item: TDetailItem) => TDetailItem) => void;
}

export type {
	CacheEntry,
	CachesSnapshot,
	DetailFamily,
	OptimisticCache,
	OptimisticResource,
	PagedFamily,
	PagedResponse,
};
