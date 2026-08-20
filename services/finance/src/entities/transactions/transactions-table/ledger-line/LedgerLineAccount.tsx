import { RowTitle } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type LedgerLineAccountProps = PropsWithChildren;

const LedgerLineAccount: FC<LedgerLineAccountProps> = ({ children }) => (
	<RowTitle as="span" size="12.5" truncate className="min-w-0 flex-1">
		{children}
	</RowTitle>
);

LedgerLineAccount.displayName = 'LedgerLineAccount';

export { LedgerLineAccount };
export type { LedgerLineAccountProps };
