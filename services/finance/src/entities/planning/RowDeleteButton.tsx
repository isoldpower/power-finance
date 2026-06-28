import type { FC } from "react";
import { Icons } from "@internal/ui-library";

interface RowDeleteButtonProps {
	label: string;
}

// The trash trigger rendered inside a goal/automation row. Wrapped by a delete-confirmation
// process that owns the dialog behaviour.
const RowDeleteButton: FC<RowDeleteButtonProps> = ({ label }) => (
	<button
		type="button"
		aria-label={label}
		className="flex size-7 flex-none items-center justify-center rounded-[7px] text-text-3 transition-colors hover:bg-[var(--neg-soft)] hover:text-neg"
	>
		<Icons.Trash2 size={15} />
	</button>
);

RowDeleteButton.displayName = 'RowDeleteButton';

export { RowDeleteButton };
export type { RowDeleteButtonProps };
