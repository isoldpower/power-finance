import { FinanceMenuContent } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type WalletSelectOptionsProps = PropsWithChildren;

const WalletSelectOptions: FC<WalletSelectOptionsProps> = ({ children }) => (
	<FinanceMenuContent
		align="start"
		className="w-[var(--radix-popover-trigger-width)] min-w-[220px] p-1"
	>
		{children}
	</FinanceMenuContent>
);

WalletSelectOptions.displayName = 'WalletSelectOptions';

export { WalletSelectOptions };
export type { WalletSelectOptionsProps };
