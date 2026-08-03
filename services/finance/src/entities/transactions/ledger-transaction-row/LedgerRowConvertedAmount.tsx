import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";
import type { Tone } from "@shared/utils";


interface LedgerRowConvertedAmountProps extends Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'> {
	tone: Tone;
	converted: boolean;
}

const LedgerRowConvertedAmount: FC<LedgerRowConvertedAmountProps> = ({
	children,
	tone,
	converted,
	...props
}) => {
	return (
		<div
			className={cn(
				"hidden w-[104px] text-right font-numeric text-[12px] md:block"
			)}
			{...props}
		>
			{converted ? (
				<span
					className={cn(
						tone === 'pos' && 'text-pos',
						tone === 'neg' && 'text-neg',
						(tone === 'neutral' || tone === 'muted') && 'text-text-2',
					)}
				>
					{children}
				</span>
			) : (
				<span className="text-text-3">—</span>
			)}
		</div>
	);
}

LedgerRowConvertedAmount.displayName = 'LedgerRowConvertedAmount';

export { LedgerRowConvertedAmount };
