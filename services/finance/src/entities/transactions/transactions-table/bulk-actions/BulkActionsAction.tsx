import { cn } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type BulkActionTone = 'default' | 'danger';
type BulkActionsActionProps = PropsWithChildren<{
	tone?: BulkActionTone;
}>;

const BulkActionsAction: FC<BulkActionsActionProps> = ({ children, tone = 'default' }) => (
	<span
		className={cn(
			"cursor-pointer hover:underline",
			tone === 'danger' ? "text-neg" : "text-text-2"
		)}
	>
		{children}
	</span>
);

BulkActionsAction.displayName = 'BulkActionsAction';

export { BulkActionsAction };
export type { BulkActionsActionProps, BulkActionTone };
