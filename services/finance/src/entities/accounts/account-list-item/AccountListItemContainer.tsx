import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


interface AccountListItemContainerProps extends Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'> {
	active: boolean;
}

const AccountListItemContainer: FC<AccountListItemContainerProps> = ({
	children,
	active,
	...props
}) => {
	return (
		<div
			className={cn(
				"flex cursor-pointer items-center gap-2.5 border-b border-border px-4 py-3 hover:bg-secondary",
				active && "bg-[var(--accent-soft)]",
			)}
			{...props}
		>
			{children}
		</div>
	);
}

AccountListItemContainer.displayName = 'AccountListItemContainer';

export { AccountListItemContainer };
