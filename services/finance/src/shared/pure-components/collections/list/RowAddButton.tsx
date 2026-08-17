import type { ButtonHTMLAttributes, FC } from "react";
import { Icons } from "@internal/ui-library";

interface RowAddButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'className' | 'aria-label' | 'children'> {
	label: string;
}

const RowAddButton: FC<RowAddButtonProps> = ({ label, ...props }) => (
	<button
		type="button"
		aria-label={label}
		className="flex size-6 flex-none items-center justify-center rounded-[6px] text-text-3 transition-colors hover:bg-secondary hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
		{...props}
	>
		<Icons.Plus size={14} />
	</button>
);

RowAddButton.displayName = 'RowAddButton';

export { RowAddButton };
export type { RowAddButtonProps };
