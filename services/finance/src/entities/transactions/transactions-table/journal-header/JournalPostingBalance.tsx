import { Text } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type JournalPostingBalanceProps = PropsWithChildren;

const JournalPostingBalance: FC<JournalPostingBalanceProps> = ({ children }) => (
	<Text size="10.5" weight="semibold" tone="positive" className="flex items-center gap-1">
		{children}
	</Text>
);

JournalPostingBalance.displayName = 'JournalPostingBalance';

export { JournalPostingBalance };
export type { JournalPostingBalanceProps };
