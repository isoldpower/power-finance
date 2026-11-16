import { Caption } from "@internal/shared";

import type { FC, PropsWithChildren } from "react";


type ScanFieldRowLabelProps = PropsWithChildren;

const ScanFieldRowLabel: FC<ScanFieldRowLabelProps> = ({ children }) => (
	<Caption as="span" size="11.5" className="w-24">
		{children}
	</Caption>
);

ScanFieldRowLabel.displayName = 'ScanFieldRowLabel';

export { ScanFieldRowLabel };
export type { ScanFieldRowLabelProps };
