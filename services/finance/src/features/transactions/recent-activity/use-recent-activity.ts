import { useMemo } from "react";

import type { TransactionPreviewDto } from "@entity/transactions";

import { useTransactionsList } from "../data-presenters";
import { DAYS_CAP, TXN_CAP } from "./config";


interface RecentActivityGroup {
	dayKey: string;
	transactions: TransactionPreviewDto[];
}

const byNewestFirst = (first: TransactionPreviewDto, second: TransactionPreviewDto) => {
	return Date.parse(second.created_at) - Date.parse(first.created_at);
};

const toDayKey = (transaction: TransactionPreviewDto) => {
	return new Date(transaction.created_at).toDateString();
};

const groupRecentByDay = (transactions: TransactionPreviewDto[]): RecentActivityGroup[] => {
	const dayGroups = new Map<string, TransactionPreviewDto[]>();
	const newest = [...transactions].sort(byNewestFirst).slice(0, TXN_CAP);

	for (const transaction of newest) {
		const dayTransactions = dayGroups.get(toDayKey(transaction));

		if (dayTransactions) {
			dayTransactions.push(transaction);
		} else if (dayGroups.size < DAYS_CAP) {
			dayGroups.set(toDayKey(transaction), [transaction]);
		} else {
			break;
		}
	}

	return [...dayGroups].map(([dayKey, transactions]) => ({ dayKey, transactions }));
};

const useRecentActivity = () => {
	const { transactions, isPending } = useTransactionsList();

	const groups = useMemo(() => groupRecentByDay(transactions), [transactions]);

	return { groups, isPending };
};

export { useRecentActivity };
export type { RecentActivityGroup };
