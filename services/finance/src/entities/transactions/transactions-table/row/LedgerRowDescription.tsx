import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type LedgerRowDescriptionProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const LedgerRowDescription: FC<LedgerRowDescriptionProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex min-w-0 flex-1 items-center gap-2.5"
		)}
		{...props}
	>
		{children}
	</div>
);

LedgerRowDescription.displayName = 'LedgerRowDescription';

export { LedgerRowDescription };
export type { LedgerRowDescriptionProps };
