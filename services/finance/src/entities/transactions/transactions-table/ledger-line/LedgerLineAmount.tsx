import { DisplayText } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type LedgerLineAmountProps = PropsWithChildren;

const LedgerLineAmount: FC<LedgerLineAmountProps> = ({ children }) => (
	<DisplayText as="span" size="13" className="min-w-16 text-right">
		{children}
	</DisplayText>
);

LedgerLineAmount.displayName = 'LedgerLineAmount';

export { LedgerLineAmount };
export type { LedgerLineAmountProps };
