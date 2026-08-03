import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const LedgerRowTitle: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div
			className={cn(
				"min-w-0 truncate text-[13.5px] font-semibold"
			)}
			{...props}
		>
			{children}
		</div>
	);
}

LedgerRowTitle.displayName = 'LedgerRowTitle';

export { LedgerRowTitle };
