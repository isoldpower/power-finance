import type { FC } from "react";
import { cn } from "@internal/ui-library";

import type { Tone } from "@shared/utils";

interface TransactionAmountStackProps {
	original: string;
	main: string;
	converted: boolean;
	tone: Tone;
}

const TransactionAmountStack: FC<TransactionAmountStackProps> = ({ original, main, converted, tone }) => (
	<div className={cn(
		"flex flex-col items-end font-numeric text-[12px] leading-tight",
		tone === 'pos' && 'text-pos',
		tone === 'neg' && 'text-neg',
		(tone === 'neutral' || tone === 'muted') && 'text-text-2',
	)}>
		<span>{original}</span>
		{converted ? <span>{main}</span> : null}
	</div>
);

TransactionAmountStack.displayName = 'TransactionAmountStack';

export { TransactionAmountStack };
export type { TransactionAmountStackProps };
