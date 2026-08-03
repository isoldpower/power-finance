import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const LedgerRowDate: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div
			className={cn(
				"text-xs"
			)}
			{...props}
		>
			{children}
		</div>
	);
}

LedgerRowDate.displayName = 'LedgerRowDate';

export { LedgerRowDate };
