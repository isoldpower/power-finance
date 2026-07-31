import type { FC } from "react";

interface JournalPostingHeaderProps {
	balancedAmount: string;
}

const JournalPostingHeader: FC<JournalPostingHeaderProps> = ({ balancedAmount }) => (
	<div className="mb-3 flex items-center gap-2">
		<span className="font-numeric text-[9.5px] tracking-[0.12em] text-text-3">JOURNAL POSTING</span>
		<div className="flex-1" />
		<span className="flex items-center gap-1 text-[10.5px] font-semibold text-pos">
			<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
				<polyline points="20 6 9 17 4 12" />
			</svg>
			balanced · {balancedAmount}
		</span>
	</div>
);

JournalPostingHeader.displayName = 'JournalPostingHeader';

export { JournalPostingHeader };
export type { JournalPostingHeaderProps };
