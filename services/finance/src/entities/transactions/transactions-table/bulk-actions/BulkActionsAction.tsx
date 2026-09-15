import { cn } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type BulkActionTone = 'default' | 'danger';
type BulkActionsActionProps = PropsWithChildren<{
	tone?: BulkActionTone;
}>;

const BulkActionsAction: FC<BulkActionsActionProps> = ({ children, tone = 'default' }) => (
	<button
		type="button"
		className={cn(
			"cursor-pointer bg-transparent p-0 text-inherit outline-none hover:underline",
			"focus-visible:rounded-[var(--radius-sm)] focus-visible:ring-[3px]",
			"focus-visible:ring-[var(--accent-soft)]",
			tone === 'danger' ? "text-neg" : "text-text-2"
		)}
	>
		{children}
	</button>
);

BulkActionsAction.displayName = 'BulkActionsAction';

export { BulkActionsAction };
export type { BulkActionsActionProps, BulkActionTone };
