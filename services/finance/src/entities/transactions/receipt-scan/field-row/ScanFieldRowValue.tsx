import { RowTitle } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type ScanFieldRowValueProps = PropsWithChildren;

const ScanFieldRowValue: FC<ScanFieldRowValueProps> = ({ children }) => (
	<RowTitle as="span" size="13.5" className="flex flex-1 items-center gap-2">
		{children}
	</RowTitle>
);

ScanFieldRowValue.displayName = 'ScanFieldRowValue';

export { ScanFieldRowValue };
export type { ScanFieldRowValueProps };
