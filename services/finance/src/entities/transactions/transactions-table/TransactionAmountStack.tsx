import { cn } from "@internal/ui-library";
import { MetaText } from "@shared/pure-components/typography";

import type { FC } from "react";
import type { Tone } from "@shared/formatting";


interface TransactionAmountStackProps {
	original: string;
	main: string;
	converted: boolean;
	tone: Tone;
}

const TransactionAmountStack: FC<TransactionAmountStackProps> = ({ original, main, converted, tone }) => (
	<MetaText as="div" size="12" tone="default" leading="tight" className={cn(
		"flex flex-col items-end",
		tone === 'pos' && 'text-pos',
		tone === 'neg' && 'text-neg',
		(tone === 'neutral' || tone === 'muted') && 'text-text-2',
	)}>
		<span>{original}</span>
		{converted ? <span>{main}</span> : null}
	</MetaText>
);

TransactionAmountStack.displayName = 'TransactionAmountStack';

export { TransactionAmountStack };
export type { TransactionAmountStackProps };
