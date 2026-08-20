import { FinanceBadge } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type LedgerLineSideProps = PropsWithChildren<{
	debit: boolean;
}>;

const LedgerLineSide: FC<LedgerLineSideProps> = ({ children, debit }) => (
	<FinanceBadge tone={debit ? 'accent' : 'viol'} appearance="soft" size="sm">
		{children}
	</FinanceBadge>
);

LedgerLineSide.displayName = 'LedgerLineSide';

export { LedgerLineSide };
export type { LedgerLineSideProps };
