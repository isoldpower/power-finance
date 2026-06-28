import { useMemo, useState } from "react";

import { useConvertMoney } from "@feature/fx";
import { useTransactionsList, toTransactionRow } from "@feature/transaction";
import { useLocaleCurrency, relativeTime } from "@shared/utils";

import { useWalletsList } from "../data-presenters/use-wallets-list.ts";
import { gradientFromId, walletTypeLabel } from "../adapters";

// Wallets section behaviour: search/type/sort filtering, pinning, selection, and the selected
// wallet's recent activity + month in/out flow. The recent-row count is supplied by the
// management widget that owns the config. Presentation lives in the wallet list entities.
const useWalletBrowser = (recentSlots: number) => {
	const { wallets: rawWallets, isPending } = useWalletsList();
	const { transactions } = useTransactionsList();
	const { convert } = useConvertMoney();
	const formatCurrency = useLocaleCurrency();

	const [query, setQuery] = useState('');
	const [typeFilter, setTypeFilter] = useState('all');
	const [sort, setSort] = useState('name');
	const [pins, setPins] = useState<Record<string, boolean>>({});
	const [selectedId, setSelectedId] = useState<string | null>(null);

	const decorated = useMemo(() => rawWallets.map((wallet) => ({
		id: wallet.id,
		name: wallet.name,
		type: walletTypeLabel(wallet),
		currency: wallet.balance.currency,
		balance: wallet.balance,
		gradient: gradientFromId(wallet.id),
		credit: wallet.credit,
		updated: wallet.updatedAt ? relativeTime(wallet.updatedAt) : '',
	})), [rawWallets]);

	const types = useMemo(() => [...new Set(decorated.map((wallet) => wallet.type))], [decorated]);

	const wallets = useMemo(() => {
		const filtered = decorated.filter((wallet) => {
			const matchesQuery = wallet.name.toLowerCase().includes(query.toLowerCase());
			const matchesType = typeFilter === 'all' || wallet.type === typeFilter;
			return matchesQuery && matchesType;
		});
		const sorted = sort === 'balance-desc'
			? [...filtered].sort((a, b) => b.balance.amount - a.balance.amount)
			: [...filtered].sort((a, b) => a.name.localeCompare(b.name));
		return [...sorted].sort((a, b) => Number(pins[b.id] ?? false) - Number(pins[a.id] ?? false));
	}, [decorated, query, typeFilter, sort, pins]);

	// Array index access is typed non-nullable here, so guard on length to keep `selected`
	// honestly optional (the list can be empty) for downstream null checks.
	const firstVisible = wallets.length > 0 ? wallets[0] : undefined;
	const firstOverall = decorated.length > 0 ? decorated[0] : undefined;
	const selected = decorated.find((wallet) => wallet.id === selectedId) ?? firstVisible ?? firstOverall;

	const walletById = useMemo(
		() => new Map(rawWallets.map((wallet) => [wallet.id, { name: wallet.name, currency: wallet.balance.currency }])),
		[rawWallets]
	);

	const recent = useMemo(() => {
		if (!selected) return [];
		return transactions
			.filter((txn) => txn.source_wallet_id === selected.id)
			.sort((a, b) => b.created_at.localeCompare(a.created_at))
			.slice(0, recentSlots)
			.map((txn) => toTransactionRow(txn, walletById, formatCurrency));
	}, [transactions, selected, walletById, formatCurrency, recentSlots]);

	const monthFlow = useMemo(() => {
		if (!selected) return { in: 0, out: 0 };
		return transactions
			.filter((txn) => txn.source_wallet_id === selected.id)
			.reduce((flow, txn) => {
				const value = parseFloat(txn.amount);
				if (value >= 0) flow.in += value; else flow.out += Math.abs(value);
				return flow;
			}, { in: 0, out: 0 });
	}, [transactions, selected]);

	const togglePin = (id: string) => { setPins((prev) => ({ ...prev, [id]: !prev[id] })); };

	return {
		isPending,
		convert,
		formatCurrency,
		query,
		setQuery,
		typeFilter,
		setTypeFilter,
		sort,
		setSort,
		pins,
		togglePin,
		types,
		wallets,
		selected,
		setSelectedId,
		recent,
		monthFlow,
		total: decorated.length,
		recentSlots,
	};
};

export { useWalletBrowser };
