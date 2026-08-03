import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const LedgerRowWallet: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div
			className={cn(
				"hidden w-[130px] text-[12.5px] text-text-2 md:block"
			)}
			{...props}
		>
			{children}
		</div>
	);
}

LedgerRowWallet.displayName = 'LedgerRowWallet';

export { LedgerRowWallet };
