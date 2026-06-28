import type { FC } from "react";
import { cn } from "@internal/ui-library";

import { MoneyInOriginal } from "@entity/money";

interface WalletListRowProps {
	name: string;
	type: string;
	currency: string;
	gradient: string;
	balanceAmount: number;
	balanceCurrency: string;
	active: boolean;
	pinned: boolean;
	convert: (money: { amount: number; currency: string }) => { formatted: string; converted: boolean };
	format: (amount: number, currency: string) => string;
	onSelect: () => void;
	onTogglePin: () => void;
}

const WalletListRow: FC<WalletListRowProps> = ({
	name,
	type,
	currency,
	gradient,
	balanceAmount,
	balanceCurrency,
	active,
	pinned,
	convert,
	format,
	onSelect,
	onTogglePin,
}) => (
	<div
		onClick={onSelect}
		className={cn(
			"flex cursor-pointer items-center gap-3 border-b border-border px-3 py-2.5 hover:bg-secondary",
			active && "bg-[var(--accent-soft)]"
		)}
	>
		<div className="h-[26px] w-[38px] flex-none rounded-[6px]" style={{ background: gradient }} />
		<div className="min-w-0 flex-1">
			<div className="truncate text-[13.5px] font-semibold">{name}</div>
			<div className="text-[11px] text-text-3">{type} · {currency}</div>
		</div>
		<MoneyInOriginal amount={balanceAmount} currency={balanceCurrency} tone={balanceAmount >= 0 ? 'neutral' : 'neg'} size="sm" align="end" convert={convert} format={format} />
		<button
			type="button"
			title="Pin wallet"
			onClick={(event) => { event.stopPropagation(); onTogglePin(); }}
			className={cn(
				"flex size-[26px] flex-none items-center justify-center rounded-[7px] hover:bg-surface-3",
				pinned ? "text-primary" : "text-text-3"
			)}
		>
			<svg width="14" height="14" viewBox="0 0 24 24" fill={pinned ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
				<path d="M9 4h6l-1 7 3 3v1H7v-1l3-3z" />
				<line x1="12" y1="15" x2="12" y2="21" />
			</svg>
		</button>
	</div>
);

WalletListRow.displayName = 'WalletListRow';

export { WalletListRow };
export type { WalletListRowProps };
