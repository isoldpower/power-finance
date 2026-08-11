import { cn } from "@internal/ui-library";

import type { FC, ReactNode } from "react";
import type { Tone } from "@shared/formatting";

interface WalletTxnIconProps {
	children: ReactNode;
	tone: Tone;
}

const WalletTransactionIcon: FC<WalletTxnIconProps> = ({ children, tone }) => (
	<div
		className={cn(
			`flex size-[30px] flex-none items-center justify-center rounded-[8px]`,
			tone === 'pos' && 'bg-pos-soft text-pos',
			tone === 'neg' && 'bg-[var(--neg-soft)] text-neg',
		)}
	>
		{children}
	</div>
);

WalletTransactionIcon.displayName = 'WalletTxnIcon';

export { WalletTransactionIcon };
export type { WalletTxnIconProps };
