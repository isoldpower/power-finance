import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";
import { MetaText } from "@shared/pure-components/typography";

import type { Tone } from "@shared/formatting";


interface LedgerRowAmountProps extends Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'> {
	tone: Tone;
}

const LedgerRowAmount: FC<LedgerRowAmountProps> = ({
	children,
	tone,
	...props
}) => {
	return (
		<MetaText
			as="div"
			size="12"
			tone="default"
			className={cn(
				"w-[104px] text-right",
				tone === 'pos' && 'text-pos',
				tone === 'neg' && 'text-neg',
				(tone === 'neutral' || tone === 'muted') && 'text-text-2',
			)}
			{...props}
		>
			{children}
		</MetaText>
	);
}

LedgerRowAmount.displayName = 'LedgerRowAmount';

export { LedgerRowAmount };
