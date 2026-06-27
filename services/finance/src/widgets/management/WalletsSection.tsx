import type { FC } from "react";
import { useMemo, useState } from "react";
import { cn, FinanceCard, FinanceMoney, FinanceButton } from "@internal/ui-library";

import { useWalletsList } from "@feature/wallet";
import { useTransactionsList } from "@feature/transaction";
import { useConvertMoney } from "@feature/fx";
import { useLocaleCurrency } from "@shared/utils";

import { SectionHeader } from "./SectionHeader.tsx";
import { gradientFromId, walletTypeLabel, relativeTime, toTransactionRow } from "./adapters.ts";
import type { PanelMode } from "./mock.ts";

interface WalletsSectionProps {
	onOpenPanel: (mode: PanelMode) => void;
	className?: string;
}

const selectClass =
	"min-w-0 flex-1 cursor-pointer rounded-[var(--radius-md)] border border-border-strong bg-card px-2 py-1.5 text-xs font-semibold text-text-2 outline-none";

const WalletsSection: FC<WalletsSectionProps> = ({ onOpenPanel, className }) => {
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
		updated: relativeTime(wallet.updatedAt),
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

	const selected = decorated.find((wallet) => wallet.id === selectedId) ?? wallets[0] ?? decorated[0];

	const walletById = useMemo(
		() => new Map(rawWallets.map((wallet) => [wallet.id, { name: wallet.name, currency: wallet.balance.currency }])),
		[rawWallets]
	);

	const recent = useMemo(() => {
		if (!selected) return [];
		return transactions
			.filter((txn) => txn.source_wallet_id === selected.id)
			.slice(0, 3)
			.map((txn) => toTransactionRow(txn, walletById, formatCurrency));
	}, [transactions, selected, walletById, formatCurrency]);

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

	return (
		<section className={className}>
			<SectionHeader
				title="Wallets"
				caption={`${decorated.length.toString()} accounts`}
				action={
					<button type="button" onClick={() => { onOpenPanel('wallet'); }} className="text-xs font-semibold text-primary hover:underline">
						＋ New wallet
					</button>
				}
			/>
			<div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[340px_1fr]">
				<FinanceCard className="overflow-hidden">
					<div className="flex items-center border-b border-border px-4 py-3">
						<span className="flex-1 text-sm font-semibold">All wallets</span>
						<span className="font-numeric text-[10px] text-text-3">{wallets.length} shown</span>
					</div>
					<div className="border-b border-border px-3 pb-2 pt-2.5">
						<div className="mb-2 flex items-center gap-2 rounded-[var(--radius-md)] border border-border-strong px-2.5 py-1.5 focus-within:border-[var(--accent-border)]">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round">
								<circle cx="11" cy="11" r="7" />
								<line x1="21" y1="21" x2="16.65" y2="16.65" />
							</svg>
							<input
								value={query}
								onChange={(event) => { setQuery(event.target.value); }}
								placeholder="Search wallets…"
								className="min-w-0 flex-1 border-none bg-transparent text-[13px] outline-none placeholder:text-[var(--text-3)]"
							/>
						</div>
						<div className="flex gap-2">
							<select value={typeFilter} onChange={(event) => { setTypeFilter(event.target.value); }} className={selectClass}>
								<option value="all">All types</option>
								{types.map((type) => <option key={type} value={type}>{type}</option>)}
							</select>
							<select value={sort} onChange={(event) => { setSort(event.target.value); }} className={selectClass}>
								<option value="name">Name A–Z</option>
								<option value="balance-desc">Balance: high → low</option>
							</select>
						</div>
					</div>
					<div className="h-[264px] overflow-y-auto">
						{isPending ? (
							<div className="px-4 py-[26px] text-center text-[13px] text-text-3">Loading…</div>
						) : wallets.length === 0 ? (
							<div className="px-4 py-[26px] text-center text-[13px] text-text-3">No wallets match your filters.</div>
						) : (
							wallets.map((wallet) => (
								<div
									key={wallet.id}
									onClick={() => { setSelectedId(wallet.id); }}
									className={cn(
										"flex cursor-pointer items-center gap-3 border-b border-border px-3 py-2.5 hover:bg-secondary",
										wallet.id === selected?.id && "bg-[var(--accent-soft)]"
									)}
								>
									<div className="h-[26px] w-[38px] flex-none rounded-[6px]" style={{ background: wallet.gradient }} />
									<div className="min-w-0 flex-1">
										<div className="truncate text-[13.5px] font-semibold">{wallet.name}</div>
										<div className="text-[11px] text-text-3">{wallet.type} · {wallet.currency}</div>
									</div>
									<FinanceMoney tone={wallet.balance.amount >= 0 ? 'neutral' : 'neg'} size="sm">{convert(wallet.balance).formatted}</FinanceMoney>
									<button
										type="button"
										title="Pin wallet"
										onClick={(event) => { event.stopPropagation(); togglePin(wallet.id); }}
										className={cn(
											"flex size-[26px] flex-none items-center justify-center rounded-[7px] hover:bg-surface-3",
											pins[wallet.id] ? "text-primary" : "text-text-3"
										)}
									>
										<svg width="14" height="14" viewBox="0 0 24 24" fill={pins[wallet.id] ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
											<path d="M9 4h6l-1 7 3 3v1H7v-1l3-3z" />
											<line x1="12" y1="15" x2="12" y2="21" />
										</svg>
									</button>
								</div>
							))
						)}
					</div>
				</FinanceCard>

				<FinanceCard className="overflow-hidden">
					{selected ? (
						<>
							<div className="relative overflow-hidden border-b border-border px-6 py-[22px]">
								<div className="pointer-events-none absolute -right-10 -top-[60px] size-[200px] rounded-full bg-[radial-gradient(circle,var(--glow),transparent_68%)]" />
								<div className="relative flex items-start gap-3.5">
									<div className="h-11 w-16 flex-none rounded-[9px] shadow-[var(--shadow)]" style={{ background: selected.gradient }} />
									<div className="flex-1">
										<div className="font-display text-lg font-semibold">{selected.name}</div>
										<div className="text-[12.5px] text-text-3">{selected.type} · {selected.currency} · updated {selected.updated}</div>
									</div>
									<div className="flex gap-2">
										<FinanceButton variant="outline" size="sm" onClick={() => { onOpenPanel('transfer'); }}>Transfer</FinanceButton>
										<FinanceButton variant="outline" size="sm" onClick={() => { onOpenPanel('edit'); }}>Edit</FinanceButton>
									</div>
								</div>
								<div className="relative mt-[18px] flex items-end gap-5">
									<div>
										<div className="font-numeric text-[10px] uppercase tracking-[0.1em] text-text-3">Balance</div>
										<FinanceMoney tone={selected.balance.amount >= 0 ? 'neutral' : 'neg'} size="xl">{convert(selected.balance).formatted}</FinanceMoney>
									</div>
									<div className="flex-1" />
									<div>
										<div className="text-[11px] text-text-3">In</div>
										<FinanceMoney tone="pos" size="md">{convert({ amount: monthFlow.in, currency: selected.currency }).formatted}</FinanceMoney>
									</div>
									<div>
										<div className="text-[11px] text-text-3">Out</div>
										<FinanceMoney tone="neg" size="md">{convert({ amount: monthFlow.out, currency: selected.currency }).formatted}</FinanceMoney>
									</div>
								</div>
							</div>
							<div className="px-[18px] pb-1 pt-3.5">
								<span className="text-[13.5px] font-semibold">Recent in this wallet</span>
							</div>
							{recent.length === 0 ? (
								<div className="flex items-center gap-3 border-b border-border px-[18px] py-2.5">
									<div className="size-[30px] flex-none rounded-[8px] border border-dashed border-border-strong" />
									<div className="flex-1 text-xs text-text-3 opacity-50">No activity yet</div>
								</div>
							) : (
								recent.map((txn) => (
									<div key={txn.id} className="flex items-center gap-3 border-b border-border px-[18px] py-2.5 last:border-b-0 hover:bg-secondary">
										<div className={`flex size-[30px] flex-none items-center justify-center rounded-[8px] ${txn.iconClass}`}>{txn.icon}</div>
										<div className="min-w-0 flex-1">
											<div className="text-[13px] font-semibold">{txn.category}</div>
											<div className="text-[11px] text-text-3">{txn.date} · {txn.time}</div>
										</div>
										<FinanceMoney tone={txn.tone} size="sm">{convert({ amount: txn.amount, currency: txn.currency }).formatted}</FinanceMoney>
									</div>
								))
							)}
						</>
					) : (
						<div className="px-6 py-16 text-center text-[13px] text-text-3">
							{isPending ? 'Loading…' : 'No wallet selected. Create one to get started.'}
						</div>
					)}
				</FinanceCard>
			</div>
		</section>
	);
};

WalletsSection.displayName = 'WalletsSection';

export { WalletsSection };
export type { WalletsSectionProps };
