import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const LedgerRowDescription: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div
			className={cn(
				"flex min-w-0 flex-1 items-center gap-2.5"
			)}
			{...props}
		>
			{children}
		</div>
	);
}

LedgerRowDescription.displayName = 'LedgerRowDescription';

export { LedgerRowDescription };
