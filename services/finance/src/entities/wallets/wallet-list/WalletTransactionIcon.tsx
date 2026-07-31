import type { FC, ReactNode } from "react";
import { cn } from "@internal/ui-library";

interface WalletTxnIconProps {
	children: ReactNode;
	className: string;
}

const WalletTransactionIcon: FC<WalletTxnIconProps> = ({ children, className }) => (
	<div 
		className={cn(
			`flex size-[30px] flex-none items-center justify-center rounded-[8px]`,
			className
		)}
	>
		{children}
	</div>
);

WalletTransactionIcon.displayName = 'WalletTxnIcon';

export { WalletTransactionIcon };
export type { WalletTxnIconProps };
