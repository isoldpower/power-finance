import { cn } from "@internal/ui-library";

import type { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";


type GoalDialogOptionProps = PropsWithChildren<
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type' | 'role' | 'aria-checked'> & {
		selected: boolean;
	}
>;

const GoalDialogOption: FC<GoalDialogOptionProps> = ({
	children,
	selected,
	...props
}) => (
	<button
		type="button"
		role="radio"
		aria-checked={selected}
		className={cn(
			"flex w-full items-start gap-3 rounded-[var(--radius-md)] border px-3.5 py-2.5",
			"text-left transition-colors",
			selected ? "border-primary bg-[var(--accent-soft)]" : "border-border-strong hover:bg-secondary"
		)}
		{...props}
	>
		{children}
	</button>
);

GoalDialogOption.displayName = 'GoalDialogOption';

export { GoalDialogOption };
export type { GoalDialogOptionProps };
