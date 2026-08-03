import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const LedgerRowSelectCell: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div
			className={cn(
				"w-[22px]"
			)}
			{...props}
		>
			{children}
		</div>
	);
}

LedgerRowSelectCell.displayName = 'LedgerRowSelectCell';

export { LedgerRowSelectCell };
