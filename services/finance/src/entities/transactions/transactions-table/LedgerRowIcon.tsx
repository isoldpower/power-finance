import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";
import type { Tone } from "@shared/formatting";


interface LedgerRowIconProps extends Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'> {
	tone: Tone;
}

const LedgerRowIcon: FC<LedgerRowIconProps> = ({
	children,
	tone,
	...props
}) => {
	return (
		<div
			className={cn(
				"flex size-[30px] flex-none items-center justify-center rounded-[8px]",
				tone === 'pos' && 'bg-pos-soft text-pos',
				tone === 'neg' && 'bg-[var(--accent-soft)] text-primary',
			)}
			{...props}
		>
			{children}
		</div>
	);
}

LedgerRowIcon.displayName = 'LedgerRowIcon';

export { LedgerRowIcon };
