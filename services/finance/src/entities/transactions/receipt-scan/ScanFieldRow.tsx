import type { FC } from "react";
import { Caption, RowTitle, Text } from "@shared/pure-components/typography";

interface ScanFieldRowProps {
	label: string;
	value: string;
	ai: boolean;
}

const ScanFieldRow: FC<ScanFieldRowProps> = ({ label, value, ai }) => (
	<div className="flex items-center gap-3 border-b border-border py-2.5">
		<Caption as="span" size="11.5" className="w-24">{label}</Caption>
		<RowTitle as="span" size="13.5" className="flex flex-1 items-center gap-2">
			{value}
			{ai ? <Text family="numeric" size="8.5" weight="semibold" tone="accent" className="rounded-[4px] border border-[var(--accent-border)] px-1">AI</Text> : null}
		</RowTitle>
		<Caption as="span" size="11" className="cursor-pointer">edit</Caption>
	</div>
);

ScanFieldRow.displayName = 'ScanFieldRow';

export { ScanFieldRow };
export type { ScanFieldRowProps };
