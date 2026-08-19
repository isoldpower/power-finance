import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { Types } from "@shared/formatting";


type LedgerRowIconProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'> & {
	tone: Types;
}>;

const LedgerRowIcon: FC<LedgerRowIconProps> = ({
	children,
	tone,
	...props
}) => (
	<div
		className={cn(
			"flex size-[30px] flex-none items-center justify-center rounded-[8px]",
			tone === 'pos' && "bg-pos-soft text-pos",
			tone === 'neg' && "bg-[var(--neg-soft)] text-neg"
		)}
		{...props}
	>
		{children}
	</div>
);

LedgerRowIcon.displayName = 'LedgerRowIcon';

export { LedgerRowIcon };
export type { LedgerRowIconProps };
