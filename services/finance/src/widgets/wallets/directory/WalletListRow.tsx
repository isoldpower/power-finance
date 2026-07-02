import type { FC } from "react";
import { cn } from "@internal/ui-library";

import { MoneyInOriginal } from "@entity/localization";
import { WalletSwatch, WalletPinButton } from "@entity/wallets";
import type { ConvertedMoney, Money } from "@feature/localization";

interface WalletListRowProps {
	name: string;
	type?: string;
	currency: string;
	gradient: string;
	balanceAmount: number;
	balanceCurrency: string;
	active: boolean;
	pinned: boolean;
	convert: (money: Money) => ConvertedMoney;
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
		<WalletSwatch gradient={gradient} />
		<div className="min-w-0 flex-1">
			<div className="truncate text-[13.5px] font-semibold">{name}</div>
			<div className="text-[11px] text-text-3">{type} · {currency}</div>
		</div>
		<MoneyInOriginal amount={balanceAmount} currency={balanceCurrency} tone={balanceAmount >= 0 ? 'neutral' : 'neg'} size="sm" align="end" convert={convert} format={format} />
		<WalletPinButton pinned={pinned} onClick={(event) => { event.stopPropagation(); onTogglePin(); }} />
	</div>
);

WalletListRow.displayName = 'WalletListRow';

export { WalletListRow };
export type { WalletListRowProps };
