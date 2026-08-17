import { DisplayText } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type ScanAmountCardValueProps = PropsWithChildren;

const ScanAmountCardValue: FC<ScanAmountCardValueProps> = ({ children }) => (
	<DisplayText tone="negative">
		{children}
	</DisplayText>
);

ScanAmountCardValue.displayName = 'ScanAmountCardValue';

export { ScanAmountCardValue };
export type { ScanAmountCardValueProps };
