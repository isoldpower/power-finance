import type { FC } from "react";
import { cn } from "@internal/ui-library";

import { toneTextClass } from "../transaction-visual.ts";
import type { TransactionRowView } from "./types.ts";

interface TransactionAmountStackProps {
	original: string;
	main: string;
	converted: boolean;
	tone: TransactionRowView['tone'];
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
