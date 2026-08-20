import { Overline } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type LedgerLineKindProps = PropsWithChildren;

const LedgerLineKind: FC<LedgerLineKindProps> = ({ children }) => (
	<Overline as="span" size="9" tracking="0.06em">
		{children}
	</Overline>
);

LedgerLineKind.displayName = 'LedgerLineKind';

export { LedgerLineKind };
export type { LedgerLineKindProps };
