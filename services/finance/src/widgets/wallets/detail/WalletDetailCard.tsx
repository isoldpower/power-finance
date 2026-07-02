import type { FC } from "react";
import { FinanceCard, FinanceMoney, FinanceButton } from "@internal/ui-library";

import { MoneyInOriginal } from "@entity/localization";
import { WalletRecentRow } from "./WalletRecentRow.tsx";
import type { TransactionRowView } from "@entity/transactions";
import type { BrowserWallet } from "@feature/wallets";
import type { ConvertedMoney, Money } from "@feature/localization";

interface WalletDetailCardProps {
	selected: BrowserWallet | undefined;
	isPending: boolean;
	convert: (money: Money) => ConvertedMoney;
	formatCurrency: (amount: number, currency: string) => string;
	monthFlow: { in: number; out: number };
	recent: TransactionRowView[];
	recentSlots: number;
	onTransfer: () => void;
	onEdit: () => void;
	onSeeAll: () => void;
}

const WalletDetailCard: FC<WalletDetailCardProps> = ({
	selected,
	isPending,
	convert,
	formatCurrency,
	monthFlow,
	recent,
	recentSlots,
	onTransfer,
	onEdit,
	onSeeAll,
}) => {
	return (
		<FinanceCard className="overflow-hidden">
			{selected ? (
				<>
					<div className="relative overflow-hidden border-b border-border px-6 py-[22px]">
						<div className="relative flex items-start gap-3.5">
							<div className="h-11 w-16 flex-none rounded-[9px] shadow-[var(--shadow)]" style={{ background: selected.gradient }} />
							<div className="flex-1">
								<div className="font-display text-lg font-semibold">{selected.name}</div>
								<div className="text-[12.5px] text-text-3">{selected.type} · {selected.currency}{selected.updated ? ` · updated ${selected.updated}` : ''}</div>
							</div>
							<div className="flex gap-2">
								<FinanceButton variant="outline" size="sm" onClick={onTransfer}>Transfer</FinanceButton>
								<FinanceButton variant="outline" size="sm" onClick={onEdit}>Edit</FinanceButton>
							</div>
						</div>
						<div className="relative mt-[18px] flex items-end gap-5">
							<div>
								<div className="font-numeric text-[10px] uppercase tracking-[0.1em] text-text-3">
									Balance
								</div>
								<MoneyInOriginal amount={selected.balance.amount} currency={selected.balance.currency} tone={selected.balance.amount >= 0 ? 'neutral' : 'neg'} size="xl" align="start" convert={convert} format={formatCurrency} />
							</div>
							<div className="flex-1" />
							<div>
								<div className="text-[11px] text-text-3">In</div>
								<FinanceMoney tone="pos" size="md">{formatCurrency(monthFlow.in, selected.currency)}</FinanceMoney>
							</div>
							<div>
								<div className="text-[11px] text-text-3">Out</div>
								<FinanceMoney tone="neg" size="md">{formatCurrency(monthFlow.out, selected.currency)}</FinanceMoney>
							</div>
						</div>
					</div>
					<div className="px-[18px] pb-1 pt-3.5">
						<span className="text-[13.5px] font-semibold">Recent in this wallet</span>
					</div>
					{recent.map((txn) => (
						<WalletRecentRow
							key={txn.id}
							icon={txn.icon}
							iconClass={txn.iconClass}
							category={txn.category}
							date={txn.date}
							time={txn.time}
							amount={txn.amount}
							currency={txn.currency}
							tone={txn.tone}
							convert={convert}
							format={formatCurrency}
						/>
					))}
					{Array.from({ length: Math.max(0, recentSlots - recent.length) }).map((_, index) => (
						<div key={`empty-${index.toString()}`} className="flex items-center gap-3 border-b border-border px-[18px] py-2.5">
							<div className="size-[30px] flex-none rounded-[8px] border border-dashed border-border-strong" />
							<div className="min-w-0 flex-1">
								<div className="text-[13px] font-medium text-text-3 opacity-50">No activity yet</div>
								<div className="text-[11px] text-text-3">&nbsp;</div>
							</div>
						</div>
					))}
					<button
						type="button"
						onClick={onSeeAll}
						className="flex w-full items-center justify-center gap-1.5 px-[18px] py-3 text-[12.5px] font-semibold text-primary hover:bg-secondary"
					>
						See all transactions for {selected.name} →
					</button>
				</>
			) : (
				<div className="px-6 py-16 text-center text-[13px] text-text-3">
					{isPending ? 'Loading…' : 'No wallet selected. Create one to get started.'}
				</div>
			)}
		</FinanceCard>
	);
};

WalletDetailCard.displayName = 'WalletDetailCard';

export { WalletDetailCard };
export type { WalletDetailCardProps };
