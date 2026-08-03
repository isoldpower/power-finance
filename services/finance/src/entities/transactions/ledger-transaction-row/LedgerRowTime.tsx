import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const LedgerRowTime: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div
			className={cn(
				"text-[10px] text-text-3"
			)}
			{...props}
		>
			{children}
		</div>
	);
}

LedgerRowTime.displayName = 'LedgerRowTime';

export { LedgerRowTime };
