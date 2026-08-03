import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const AccountListItemName: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div
			className={cn(
				"truncate text-[13px] font-semibold"
			)}
			{...props}
		>
			{children}
		</div>
	);
}

AccountListItemName.displayName = 'AccountListItemName';

export { AccountListItemName };
