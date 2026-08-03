import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const LedgerRowDateCell: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div
			className={cn(
				"w-[74px] font-numeric"
			)}
			{...props}
		>
			{children}
		</div>
	);
}

LedgerRowDateCell.displayName = 'LedgerRowDateCell';

export { LedgerRowDateCell };
