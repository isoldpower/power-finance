import {cn, Icons} from "@internal/ui-library";

import type { ButtonHTMLAttributes, FC } from "react";


interface RowDeleteButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'className' | 'aria-label' | 'children'> {
	label: string;
}

const RowDeleteButton: FC<RowDeleteButtonProps> = ({ label, ...props }) => (
	<button
		type="button"
		aria-label={label}
		className={cn(
			"flex size-7 flex-none items-center justify-center rounded-[7px] text-text-3",
			"transition-colors hover:bg-[var(--neg-soft)] hover:text-neg",
		)}
		{...props}
	>
		<Icons.Trash2 size={15} />
	</button>
);

RowDeleteButton.displayName = 'RowDeleteButton';

export { RowDeleteButton };
export type { RowDeleteButtonProps };
