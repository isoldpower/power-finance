import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type LedgerRowSelectCellProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const LedgerRowSelectCell: FC<LedgerRowSelectCellProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"w-[22px]"
		)}
		{...props}
	>
		{children}
	</div>
);

LedgerRowSelectCell.displayName = 'LedgerRowSelectCell';

export { LedgerRowSelectCell };
export type { LedgerRowSelectCellProps };
