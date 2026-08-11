import type { FC } from "react";

import { Caption, RowTitle, Text } from "@shared/pure-components/typography";


interface AccountHistoryEmptyProps {
	accountName: string;
}

const AccountHistoryEmpty: FC<AccountHistoryEmptyProps> = ({ accountName }) => (
	<div className="flex flex-col items-center justify-center gap-1.5 px-5 py-11 text-center">
		<Text as="div" size="17" tone="subtle" className="flex size-[38px] items-center justify-center rounded-[10px] border border-dashed border-border-strong">∅</Text>
		<RowTitle as="p" tone="muted">No transactions yet</RowTitle>
		<Caption size="xs" leading="relaxed" className="max-w-[300px]">
			Nothing has posted to {accountName} this period. Activity will appear here as it’s recorded.
		</Caption>
	</div>
);

AccountHistoryEmpty.displayName = 'AccountHistoryEmpty';

export { AccountHistoryEmpty };
export type { AccountHistoryEmptyProps };
