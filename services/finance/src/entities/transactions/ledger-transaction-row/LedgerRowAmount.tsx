import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";
import type { Tone } from "@shared/utils";


interface LedgerRowAmountProps extends Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'> {
	tone: Tone;
}

const LedgerRowAmount: FC<LedgerRowAmountProps> = ({
	children,
	tone,
	...props
}) => {
	return (
		<div
			className={cn(
				"w-[104px] text-right font-numeric text-[12px]",
				tone === 'pos' && 'text-pos',
				tone === 'neg' && 'text-neg',
				(tone === 'neutral' || tone === 'muted') && 'text-text-2',
			)}
			{...props}
		>
			{children}
		</div>
	);
}

LedgerRowAmount.displayName = 'LedgerRowAmount';

export { LedgerRowAmount };
