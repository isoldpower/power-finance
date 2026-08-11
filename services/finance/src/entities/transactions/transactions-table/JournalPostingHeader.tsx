import type { FC } from "react";
import { MetaText, Text } from "@shared/pure-components/typography";

interface JournalPostingHeaderProps {
	balancedAmount: string;
}

const JournalPostingHeader: FC<JournalPostingHeaderProps> = ({ balancedAmount }) => (
	<div className="mb-3 flex items-center gap-2">
		<MetaText size="9.5" tracking="0.12em">JOURNAL POSTING</MetaText>
		<div className="flex-1" />
		<Text size="10.5" weight="semibold" tone="positive" className="flex items-center gap-1">
			<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
				<polyline points="20 6 9 17 4 12" />
			</svg>
			balanced · {balancedAmount}
		</Text>
	</div>
);

JournalPostingHeader.displayName = 'JournalPostingHeader';

export { JournalPostingHeader };
export type { JournalPostingHeaderProps };
