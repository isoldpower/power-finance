import { useMemo } from "react";

import { useWalletsList } from "@feature/wallets";
import { useConvertMoney } from "@feature/localization";
import { useLocaleCurrency } from "@shared/utils";
import type { TransactionPreviewDto } from "@entity/transactions";

import { useTransactionsList } from "../data-presenters";
import { toTransactionRow } from "../to-transaction-row.ts";


const DAYS_CAP = 2;
const TXN_CAP = 8;

const useRecentActivityGroups = () => {
	const { transactions, isPending } = useTransactionsList();
	const { wallets } = useWalletsList();
	const { convert, targetCurrency } = useConvertMoney();
	const formatCurrency = useLocaleCurrency();

	const walletById = useMemo(
		() => new Map(wallets.map((wallet) => [wallet.id, { name: wallet.name, currency: wallet.balance.currency }])),
		[wallets]
	);

	const groups = useMemo(() => {
		const dayOf = (txn: TransactionPreviewDto) => new Date(txn.created_at).toDateString();
		const sorted = [...transactions].sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));

		const allowedDays = new Set<string>();
		for (const txn of sorted) {
			const day = dayOf(txn);
			if (allowedDays.size >= DAYS_CAP && !allowedDays.has(day)) break;
			allowedDays.add(day);
		}
		const limited = sorted.filter((txn) => allowedDays.has(dayOf(txn))).slice(0, TXN_CAP);

		const byDay = new Map<string, TransactionPreviewDto[]>();
		for (const txn of limited) {
			const bucket = byDay.get(dayOf(txn));
			if (bucket) bucket.push(txn); else byDay.set(dayOf(txn), [txn]);
		}

		return [...byDay.entries()].map(([day, items]) => {
			const rows = items.map((item) => toTransactionRow(item, walletById, formatCurrency));
			const sum = rows.reduce((total, row) => total + convert({ amount: row.amount, currency: row.currency }).amount, 0);
			return {
				label: new Date(day).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }),
				sum,
				rows,
			};
		});
	}, [transactions, walletById, formatCurrency, convert]);

	return { groups, isPending, convert, formatCurrency, targetCurrency };
};

export { useRecentActivityGroups };
