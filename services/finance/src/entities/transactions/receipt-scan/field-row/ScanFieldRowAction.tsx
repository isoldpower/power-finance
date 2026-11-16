import { Caption } from "@internal/shared";

import type { FC, PropsWithChildren } from "react";


type ScanFieldRowActionProps = PropsWithChildren;

const ScanFieldRowAction: FC<ScanFieldRowActionProps> = ({ children }) => (
	<Caption as="span" size="11" className="cursor-pointer">
		{children}
	</Caption>
);

ScanFieldRowAction.displayName = 'ScanFieldRowAction';

export { ScanFieldRowAction };
export type { ScanFieldRowActionProps };
