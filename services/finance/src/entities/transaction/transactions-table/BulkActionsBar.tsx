import type { FC } from "react";

interface BulkActionsBarProps {
	count: number;
	onClear: () => void;
}

const BulkActionsBar: FC<BulkActionsBarProps> = ({ count, onClear }) => (
	<div className="flex items-center gap-3.5 border-b border-border bg-[var(--accent-soft)] px-4 py-2.5 text-[12.5px]">
		<span className="font-semibold text-primary">{count} selected</span>
		<span className="cursor-pointer text-text-2 hover:underline">Recategorize</span>
		<span className="cursor-pointer text-text-2 hover:underline">Change wallet</span>
		<span className="cursor-pointer text-neg hover:underline">Delete</span>
		<div className="flex-1" />
		<button type="button" onClick={onClear} className="text-text-3 hover:underline">Clear</button>
	</div>
);

BulkActionsBar.displayName = 'BulkActionsBar';

export { BulkActionsBar };
export type { BulkActionsBarProps };
