import { useMemo } from "react";

import { useWalletsList } from "@feature/wallet";
import { useConvertMoney } from "@feature/fx";
import { useLocaleCurrency } from "@shared/utils";
import type { TransactionPreviewDto } from "@entity/transaction";

import { useTransactionsList } from "../data-presenters/use-transactions-list.ts";
import { toTransactionRow } from "../adapters";

// Cap recent activity to the 2 most recent days with activity, and never more than 8 transactions.
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

		// Keep only the most recent DAYS_CAP distinct activity days…
		const allowedDays = new Set<string>();
		for (const txn of sorted) {
			const day = dayOf(txn);
			if (allowedDays.size >= DAYS_CAP && !allowedDays.has(day)) break;
			allowedDays.add(day);
		}
		// …then cap the total transactions shown.
		const limited = sorted.filter((txn) => allowedDays.has(dayOf(txn))).slice(0, TXN_CAP);

		const byDay = new Map<string, TransactionPreviewDto[]>();
		for (const txn of limited) {
			const bucket = byDay.get(dayOf(txn));
			if (bucket) bucket.push(txn); else byDay.set(dayOf(txn), [txn]);
		}

		return [...byDay.entries()].map(([day, items]) => {
			const rows = items.map((item) => toTransactionRow(item, walletById, formatCurrency));
			// Sum in the display currency — rows can come from wallets of differing currencies.
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
