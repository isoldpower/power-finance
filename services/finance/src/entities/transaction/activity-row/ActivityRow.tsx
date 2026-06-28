import type { FC } from "react";

import { MoneyInOriginal } from "@entity/money";
import type { Tone } from "@shared/utils";

interface ActivityRowProps {
	icon: string;
	iconClass: string;
	walletName: string;
	category: string;
	time: string;
	date: string;
	amount: number;
	currency: string;
	tone: Tone;
	convert: (money: { amount: number; currency: string }) => { formatted: string; converted: boolean };
	format: (amount: number, currency: string) => string;
}

const ActivityRow: FC<ActivityRowProps> = ({ icon, iconClass, walletName, category, time, date, amount, currency, tone, convert, format }) => (
	<div className="flex cursor-pointer items-center gap-3 border-b border-border px-[18px] py-2.5 last:border-b-0 hover:bg-secondary">
		<div className={`flex size-8 flex-none items-center justify-center rounded-[8px] ${iconClass}`}>{icon}</div>
		<div className="min-w-0 flex-1">
			<div className="text-[13.5px] font-semibold">{walletName}</div>
			<div className="flex items-center gap-1.5 text-[11.5px] text-text-3">
				<span>{category}</span>
				<span className="size-[3px] rounded-full bg-text-3" />
				<span>{time}</span>
			</div>
		</div>
		<div className="text-right">
			<MoneyInOriginal amount={amount} currency={currency} tone={tone} size="sm" align="end" convert={convert} format={format} />
			<div className="font-numeric text-[10.5px] text-text-3">{date}</div>
		</div>
	</div>
);

ActivityRow.displayName = 'ActivityRow';

export { ActivityRow };
export type { ActivityRowProps };
