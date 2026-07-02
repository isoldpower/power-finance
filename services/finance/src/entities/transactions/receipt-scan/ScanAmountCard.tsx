import type { FC } from "react";

interface ScanAmountCardProps {
	amountFormatted: string;
	confidence: string;
}

const ScanAmountCard: FC<ScanAmountCardProps> = ({ amountFormatted, confidence }) => (
	<div className="mb-3.5 flex items-center justify-between rounded-[var(--radius-md)] border-[1.5px] border-primary px-4 py-3.5 shadow-[0_0_0_3px_var(--accent-soft)]">
		<div>
			<div className="font-numeric text-[10.5px] uppercase tracking-[0.1em] text-text-3">Amount</div>
			<div className="font-display text-3xl font-semibold text-neg">{amountFormatted}</div>
		</div>
		<span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-[10px] text-primary">{confidence}</span>
	</div>
);

ScanAmountCard.displayName = 'ScanAmountCard';

export { ScanAmountCard };
export type { ScanAmountCardProps };
