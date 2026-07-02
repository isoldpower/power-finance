import type { FC } from "react";

import { MoneyInOriginal } from "@entity/localization";
import { WalletTxnIcon } from "@entity/wallets";
import type { ConvertedMoney, Money } from "@feature/localization";
import type { Tone } from "@shared/utils";

interface WalletRecentRowProps {
	icon: string;
	iconClass: string;
	category: string;
	date: string;
	time: string;
	amount: number;
	currency: string;
	tone: Tone;
	convert: (money: Money) => ConvertedMoney;
	format: (amount: number, currency: string) => string;
}

const WalletRecentRow: FC<WalletRecentRowProps> = ({ icon, iconClass, category, date, time, amount, currency, tone, convert, format }) => (
	<div className="flex items-center gap-3 border-b border-border px-[18px] py-2.5 hover:bg-secondary">
		<WalletTxnIcon icon={icon} iconClass={iconClass} />
		<div className="min-w-0 flex-1">
			<div className="text-[13px] font-semibold">{category}</div>
			<div className="text-[11px] text-text-3">{date} · {time}</div>
		</div>
		<MoneyInOriginal amount={amount} currency={currency} tone={tone} size="sm" align="end" convert={convert} format={format} />
	</div>
);

WalletRecentRow.displayName = 'WalletRecentRow';

export { WalletRecentRow };
export type { WalletRecentRowProps };
