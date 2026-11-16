import { Text } from "@internal/shared";

import type { FC, PropsWithChildren } from "react";


type BulkActionsCountProps = PropsWithChildren;

const BulkActionsCount: FC<BulkActionsCountProps> = ({ children }) => (
	<Text weight="semibold" tone="accent">
		{children}
	</Text>
);

BulkActionsCount.displayName = 'BulkActionsCount';

export { BulkActionsCount };
export type { BulkActionsCountProps };
