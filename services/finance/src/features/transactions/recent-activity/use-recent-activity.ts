import { useMemo } from "react";

import { useTransactionsSearch } from "../data-presenters";
import { DAYS_CAP, TXN_CAP } from "./config";

import type { Transaction, TransactionQuery } from "@entity/transactions";


interface RecentActivityGroup {
	dayKey: string;
	transactions: Transaction[];
}

const RECENT_QUERY: TransactionQuery = {};

const toDayKey = (transaction: Transaction) => {
	return new Date(transaction.createdAt).toDateString();
};

const groupRecentByDay = (transactions: Transaction[]): RecentActivityGroup[] => {
	const dayGroups = new Map<string, Transaction[]>();

	for (const transaction of transactions) {
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
	const { transactions, isPending } = useTransactionsSearch(RECENT_QUERY, {
		order: 'DESC',
		limit: TXN_CAP,
	});

	const groups = useMemo(() => groupRecentByDay(transactions), [transactions]);

	return { groups, isPending };
};

export { useRecentActivity };
export type { RecentActivityGroup };
