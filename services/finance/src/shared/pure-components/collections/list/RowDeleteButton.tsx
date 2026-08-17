import type { ButtonHTMLAttributes, FC } from "react";
import { Icons } from "@internal/ui-library";

interface RowDeleteButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'className' | 'aria-label' | 'children'> {
	label: string;
}

// The trash trigger rendered inside a goal/automation row. Wrapped by a delete-confirmation
// process that owns the dialog behaviour.
const RowDeleteButton: FC<RowDeleteButtonProps> = ({ label, ...props }) => (
	<button
		type="button"
		aria-label={label}
		className="flex size-7 flex-none items-center justify-center rounded-[7px] text-text-3 transition-colors hover:bg-[var(--neg-soft)] hover:text-neg"
		{...props}
	>
		<Icons.Trash2 size={15} />
	</button>
);

RowDeleteButton.displayName = 'RowDeleteButton';

export { RowDeleteButton };
export type { RowDeleteButtonProps };
