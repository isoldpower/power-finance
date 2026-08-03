import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const AccountListItemKind: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div
			className={cn(
				"text-[10.5px] text-text-3"
			)}
			{...props}
		>
			{children}
		</div>
	);
}

AccountListItemKind.displayName = 'AccountListItemKind';

export { AccountListItemKind };
