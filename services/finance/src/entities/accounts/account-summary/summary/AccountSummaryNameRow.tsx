import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type AccountSummaryNameRowProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const AccountSummaryNameRow: FC<AccountSummaryNameRowProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"mb-0.5 flex items-center gap-2.5"
		)}
		{...props}
	>
		{children}
	</div>
);

AccountSummaryNameRow.displayName = 'AccountSummaryNameRow';

export { AccountSummaryNameRow };
export type { AccountSummaryNameRowProps };
