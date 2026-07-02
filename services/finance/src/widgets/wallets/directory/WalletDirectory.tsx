import type { FC } from "react";
import { FinanceCard } from "@internal/ui-library";

import { SearchIcon } from "@entity/wallets";
import { WalletListRow } from "./WalletListRow.tsx";
import type { BrowserWallet } from "@feature/wallets";
import type { ConvertedMoney, Money } from "@feature/localization";

interface WalletDirectoryProps {
	isPending: boolean;
	wallets: BrowserWallet[];
	query: string;
	setQuery: (value: string) => void;
	typeFilter: string;
	setTypeFilter: (value: string) => void;
	types: string[];
	sort: string;
	setSort: (value: string) => void;
	selectedId?: string;
	pins: Record<string, boolean>;
	togglePin: (id: string) => void;
	convert: (money: Money) => ConvertedMoney;
	formatCurrency: (amount: number, currency: string) => string;
	onSelect: (id: string) => void;
}

const selectClass =
	"min-w-0 flex-1 cursor-pointer rounded-[var(--radius-md)] border border-border-strong bg-card px-2 py-1.5 text-xs font-semibold text-text-2 outline-none";

const WalletDirectory: FC<WalletDirectoryProps> = ({
	isPending,
	wallets,
	query,
	setQuery,
	typeFilter,
	setTypeFilter,
	types,
	sort,
	setSort,
	selectedId,
	pins,
	togglePin,
	convert,
	formatCurrency,
	onSelect,
}) => {
	return (
		<FinanceCard className="overflow-hidden">
			<div className="flex items-center border-b border-border px-4 py-3">
				<span className="flex-1 text-sm font-semibold">All wallets</span>
				<span className="font-numeric text-[10px] text-text-3">{wallets.length} shown</span>
			</div>
			<div className="border-b border-border px-3 pb-2 pt-2.5">
				<div className="mb-2 flex items-center gap-2 rounded-[var(--radius-md)] border border-border-strong px-2.5 py-1.5 focus-within:border-[var(--accent-border)]">
					<SearchIcon />
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
			<div className="flex h-[264px] flex-col overflow-y-auto">
				{isPending ? (
					<div className="px-4 py-[26px] text-center text-[13px] text-text-3">Loading…</div>
				) : wallets.length === 0 ? (
					<div className="px-4 py-[26px] text-center text-[13px] text-text-3">No wallets match your filters.</div>
				) : (
					wallets.map((wallet) => (
						<WalletListRow
							key={wallet.id}
							name={wallet.name}
							type={wallet.type}
							currency={wallet.currency}
							gradient={wallet.gradient}
							balanceAmount={wallet.balance.amount}
							balanceCurrency={wallet.balance.currency}
							active={wallet.id === selectedId}
							pinned={Boolean(pins[wallet.id])}
							convert={convert}
							format={formatCurrency}
							onSelect={() => { onSelect(wallet.id); }}
							onTogglePin={() => { togglePin(wallet.id); }}
						/>
					))
				)}
				{!isPending && wallets.length > 0 ? (
					<div className="flex flex-1 items-center justify-center px-4 py-4 text-center font-numeric text-[10.5px] uppercase tracking-[0.12em] text-text-3">
						No more cards
					</div>
				) : null}
			</div>
		</FinanceCard>
	);
};

WalletDirectory.displayName = 'WalletDirectory';

export { WalletDirectory };
export type { WalletDirectoryProps };
