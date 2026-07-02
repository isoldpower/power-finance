import type { FC } from "react";

interface ScanFieldRowProps {
	label: string;
	value: string;
	ai: boolean;
}

const ScanFieldRow: FC<ScanFieldRowProps> = ({ label, value, ai }) => (
	<div className="flex items-center gap-3 border-b border-border py-2.5">
		<span className="w-24 text-[11.5px] text-text-3">{label}</span>
		<span className="flex flex-1 items-center gap-2 text-[13.5px] font-semibold">
			{value}
			{ai ? <span className="rounded-[4px] border border-[var(--accent-border)] px-1 font-numeric text-[8.5px] font-semibold text-primary">AI</span> : null}
		</span>
		<span className="cursor-pointer text-[11px] text-text-3">edit</span>
	</div>
);

ScanFieldRow.displayName = 'ScanFieldRow';

export { ScanFieldRow };
export type { ScanFieldRowProps };
