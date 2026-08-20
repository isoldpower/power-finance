import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { scanReceipt } from "../transactions-api";
import { useApiContext } from "@app/api";
import { CACHE_KEYS } from "./config.ts";

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { ReceiptScan } from "@entity/transactions";
import type { ScanReceiptResponse } from "../transactions-api";


type UseReceiptScanOptions = Omit<
	UseQueryOptions<ScanReceiptResponse>,
	'queryKey' | 'queryFn'
>;

type UseReceiptScanReturn = UseQueryResult & {
	scan: ReceiptScan | null;
};

const useReceiptScan = (
	receiptId?: string,
	options?: UseReceiptScanOptions
): UseReceiptScanReturn => {
	const apiContext = useApiContext();
	const query = useQuery<ScanReceiptResponse>({
		queryKey: [CACHE_KEYS.scan, receiptId ?? 'pending'],
		queryFn: () => scanReceipt({
			handler: apiContext.transactionServers.rest,
			receiptId,
		}),
		...options ?? {}
	});

	const scan = useMemo(() => query.data ?? null, [query.data]);

	return { 
		...query,
		scan,
	};
};

export { useReceiptScan };
export type { UseReceiptScanOptions, UseReceiptScanReturn };
