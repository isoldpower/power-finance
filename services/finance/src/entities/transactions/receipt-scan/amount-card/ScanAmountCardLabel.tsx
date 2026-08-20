import { Overline } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type ScanAmountCardLabelProps = PropsWithChildren;

const ScanAmountCardLabel: FC<ScanAmountCardLabelProps> = ({ children }) => (
	<Overline size="10.5" tracking="0.1em">
		{children}
	</Overline>
);

ScanAmountCardLabel.displayName = 'ScanAmountCardLabel';

export { ScanAmountCardLabel };
export type { ScanAmountCardLabelProps };
