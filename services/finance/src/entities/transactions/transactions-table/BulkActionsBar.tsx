import { cn } from "@internal/ui-library";
import { Text } from "@shared/pure-components/typography";
import { BulkActionsAction } from "./bulk-actions/BulkActionsAction.tsx";
import { BulkActionsClear } from "./bulk-actions/BulkActionsClear.tsx";
import { BulkActionsCount } from "./bulk-actions/BulkActionsCount.tsx";

import type { FC, PropsWithChildren } from "react";
import type { BulkActionsActionProps } from "./bulk-actions/BulkActionsAction.tsx";
import type { BulkActionsClearProps } from "./bulk-actions/BulkActionsClear.tsx";
import type { BulkActionsCountProps } from "./bulk-actions/BulkActionsCount.tsx";


type BulkActionsBarProps = PropsWithChildren;
type BulkActionsBarObject = FC<BulkActionsBarProps> & {
	Action: FC<BulkActionsActionProps>;
	Clear: FC<BulkActionsClearProps>;
	Count: FC<BulkActionsCountProps>;
}

const BulkActionsBar: BulkActionsBarObject = ({ children }) => (
	<Text
		as="div"
		size="12.5"
		className={cn(
			"flex items-center gap-3.5 border-b border-border bg-[var(--accent-soft)] px-4 py-2.5"
		)}
	>
		{children}
	</Text>
);

BulkActionsBar.Action = BulkActionsAction;
BulkActionsBar.Clear = BulkActionsClear;
BulkActionsBar.Count = BulkActionsCount;
BulkActionsBar.displayName = 'BulkActionsBar';

export { BulkActionsBar };
export type { BulkActionsBarProps };
