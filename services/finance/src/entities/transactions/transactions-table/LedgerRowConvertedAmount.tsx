import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";
import type { Tone } from "@shared/formatting";
import { MetaText } from "@shared/pure-components/typography";


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
		<MetaText
			as="div"
			size="12"
			tone="default"
			className="hidden w-[104px] text-right md:block"
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
		</MetaText>
	);
}

LedgerRowConvertedAmount.displayName = 'LedgerRowConvertedAmount';

export { LedgerRowConvertedAmount };
