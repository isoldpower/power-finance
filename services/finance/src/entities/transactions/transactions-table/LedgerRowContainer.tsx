import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


interface LedgerRowContainerProps extends Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'> {
	expanded: boolean;
}

const LedgerRowContainer: FC<LedgerRowContainerProps> = ({
	children,
	expanded,
	...props
}) => {
	return (
		<div
			className={cn(
				"flex h-14 cursor-pointer items-center px-4",
				!expanded && "hover:bg-secondary",
			)}
			{...props}
		>
			{children}
		</div>
	);
}

LedgerRowContainer.displayName = 'LedgerRowContainer';

export { LedgerRowContainer };
