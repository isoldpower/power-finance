import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

import { useWalletsList } from "@feature/wallets";
import { useConvertMoney } from "@feature/localization";
import { useLocaleCurrency } from "@shared/utils";

import { toTransactionRow } from '../to-transaction-row.ts';
import { useTransactionsList } from "../data-presenters";


interface FilterOption {
	value: string;
	label: string;
}

interface TransactionBrowserConfig {
	pageSize: number;
	sortOptions: FilterOption[];
}

const toggle = (set: Set<string>, id: string) => {
	const next = new Set(set);
	if (next.has(id)) next.delete(id); else next.add(id);
	return next;
};

const useTransactionBrowser = ({ pageSize, sortOptions }: TransactionBrowserConfig) => {
	const { transactions, isPending } = useTransactionsList();
	const { wallets } = useWalletsList();
	const { convert, targetCurrency } = useConvertMoney();
	const formatCurrency = useLocaleCurrency();

	const navigate = useNavigate();
	const search = useSearch({ strict: false });
	const walletFilter = search.wallet ?? 'all';
	const sort = search.sort ?? 'recent';

	const setWalletFilter = (value: string) => {
		void navigate({ to: '.', search: (prev) => ({ ...prev, wallet: value }) });
	};
	const setSort = (value: string) => {
		void navigate({ to: '.', search: (prev) => ({ ...prev, sort: value as 'recent' | 'amount' }) });
	};

	const [query, setQuery] = useState('');
	const [typeFilter, setTypeFilter] = useState('all');
	const [selected, setSelected] = useState<Set<string>>(new Set());
	const [expanded, setExpanded] = useState<Set<string>>(new Set());

	const walletById = useMemo(
		() => new Map(wallets.map((wallet) => [wallet.id, { name: wallet.name, currency: wallet.balance.currency }])),
		[wallets]
	);

	const rows = useMemo(() => {
		const mapped = transactions.map((txn) => toTransactionRow(txn, walletById, formatCurrency));
		const filtered = mapped.filter((row) => {
			const haystack = `${row.walletName} ${row.amount.toString()} ${row.category}`.toLowerCase();
			const matchesQuery = haystack.includes(query.toLowerCase());
			const matchesWallet = walletFilter === 'all' || row.walletId === walletFilter;
			const matchesType = typeFilter === 'all'
				|| (typeFilter === 'income' && row.amount >= 0)
				|| (typeFilter === 'expense' && row.amount < 0);
			return matchesQuery && matchesWallet && matchesType;
		});
		if (sort === 'amount') return [...filtered].sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
		return [...filtered].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
	}, [transactions, walletById, formatCurrency, query, walletFilter, typeFilter, sort]);

	const hasFilters = query !== '' || walletFilter !== 'all' || typeFilter !== 'all';

	const [page, setPage] = useState(1);
	useEffect(() => { setPage(1); }, [query, walletFilter, typeFilter, sort]);

	const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
	const currentPage = Math.min(page, pageCount);
	const pageRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);
	const rangeStart = rows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
	const rangeEnd = Math.min(currentPage * pageSize, rows.length);

	const walletLabel = walletFilter === 'all'
		? 'All wallets'
		: walletById.get(walletFilter)?.name ?? 'All wallets';
	const sortLabel = sortOptions.find((option) => option.value === sort)?.label ?? '';
	const walletOptions = [
		{ value: 'all', label: 'All wallets' },
		...wallets.map((wallet) => ({ value: wallet.id, label: wallet.name })),
	];

	return {
		isPending,
		convert,
		formatCurrency,
		targetCurrency,
		total: transactions.length,
		query,
		setQuery,
		walletFilter,
		setWalletFilter,
		sort,
		setSort,
		typeFilter,
		setTypeFilter,
		selected,
		toggleSelect: (id: string) => { setSelected((prev) => toggle(prev, id)); },
		clearSelect: () => { setSelected(new Set()); },
		expanded,
		toggleExpand: (id: string) => { setExpanded((prev) => toggle(prev, id)); },
		rows,
		pageRows,
		currentPage,
		pageCount,
		rangeStart,
		rangeEnd,
		hasFilters,
		setPage,
		walletLabel,
		sortLabel,
		walletOptions,
	};
};

export { useTransactionBrowser };
