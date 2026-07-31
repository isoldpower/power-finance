import type { FC } from "react";
import { cn } from "@internal/ui-library";

import { toneTextClass } from "../transaction-visual.ts";
import type { Tone } from "@shared/utils";

interface TransactionAmountStackProps {
	original: string;
	main: string;
	converted: boolean;
	tone: Tone;
}

const TransactionAmountStack: FC<TransactionAmountStackProps> = ({ original, main, converted, tone }) => (
	<div className={cn("flex flex-col items-end font-numeric text-[12px] leading-tight", toneTextClass[tone])}>
		<span>{original}</span>
		{converted ? <span>{main}</span> : null}
	</div>
);

TransactionAmountStack.displayName = 'TransactionAmountStack';

export { TransactionAmountStack };
export type { TransactionAmountStackProps };
