import { Caption, DisplayText, Overline } from "@shared/pure-components/typography";

import type { FC } from "react";

interface ScanAmountCardProps {
	amountFormatted: string;
	confidence: string;
}

const ScanAmountCard: FC<ScanAmountCardProps> = ({ amountFormatted, confidence }) => (
	<div className="mb-3.5 flex items-center justify-between rounded-[var(--radius-md)] border-[1.5px] border-primary px-4 py-3.5 shadow-[0_0_0_3px_var(--accent-soft)]">
		<div>
			<Overline size="10.5" tracking="0.1em">Amount</Overline>
			<DisplayText tone="negative">{amountFormatted}</DisplayText>
		</div>
		<Caption as="span" size="10" tone="accent" className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1">{confidence}</Caption>
	</div>
);

ScanAmountCard.displayName = 'ScanAmountCard';

export { ScanAmountCard };
export type { ScanAmountCardProps };
