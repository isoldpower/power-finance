import { cn } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type WalletSelectValueProps = PropsWithChildren<{
	placeholder?: boolean;
}>;

const WalletSelectValue: FC<WalletSelectValueProps> = ({ children, placeholder = false }) => (
	<span className={cn("min-w-0 flex-1 truncate text-left", placeholder && "text-text-3")}>
		{children}
	</span>
);

WalletSelectValue.displayName = 'WalletSelectValue';

export { WalletSelectValue };
export type { WalletSelectValueProps };
