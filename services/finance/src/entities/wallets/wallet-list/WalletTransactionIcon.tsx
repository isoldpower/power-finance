import { cn } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";
import type { Types } from "@shared/formatting";


type WalletTransactionIconProps = PropsWithChildren<{
	tone: Types;
}>;

const WalletTransactionIcon: FC<WalletTransactionIconProps> = ({ children, tone }) => (
	<div
		className={cn(
			"flex size-[30px] flex-none items-center justify-center rounded-[8px]",
			tone === 'pos' && "bg-pos-soft text-pos",
			tone === 'neg' && "bg-[var(--neg-soft)] text-neg"
		)}
	>
		{children}
	</div>
);

WalletTransactionIcon.displayName = 'WalletTransactionIcon';

export { WalletTransactionIcon };
export type { WalletTransactionIconProps };
