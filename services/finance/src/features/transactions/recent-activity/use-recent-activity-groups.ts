import { useMemo } from "react";

import { useConvertMoney } from "@feature/localization";
import { useLocaleCurrency } from "@shared/utils";
import type { TransactionRowView } from "@entity/transactions";

import { useTransactionsList } from "../data-presenters";
import { useTransactionRowsView } from "../data-selectors";


const DAYS_CAP = 2;
const TXN_CAP = 8;

const useRecentActivityGroups = () => {
	const { transactions, isPending } = useTransactionsList();
	const { convert, targetCurrency } = useConvertMoney();
	const formatCurrency = useLocaleCurrency();
	const allRows = useTransactionRowsView(transactions);

	const groups = useMemo(() => {
		const dayOf = (row: TransactionRowView) => new Date(row.createdAt).toDateString();
		const sorted = [...allRows].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

		const allowedDays = new Set<string>();
		for (const row of sorted) {
			const day = dayOf(row);
			if (allowedDays.size >= DAYS_CAP && !allowedDays.has(day)) break;
			allowedDays.add(day);
		}
		const limited = sorted.filter((row) => allowedDays.has(dayOf(row))).slice(0, TXN_CAP);

		const byDay = new Map<string, TransactionRowView[]>();
		for (const row of limited) {
			const bucket = byDay.get(dayOf(row));
			if (bucket) bucket.push(row); else byDay.set(dayOf(row), [row]);
		}

		return [...byDay.entries()].map(([day, rows]) => {
			const sum = rows.reduce((total, row) => total + convert({ amount: row.amount, currency: row.currency }).amount, 0);
			return {
				label: new Date(day).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }),
				sum,
				rows,
			};
		});
	}, [allRows, convert]);

	return { groups, isPending, convert, formatCurrency, targetCurrency };
};

export { useRecentActivityGroups };
