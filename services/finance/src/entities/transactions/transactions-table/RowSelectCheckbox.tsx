import type { FC, MouseEventHandler } from "react";
import { cn } from "@internal/ui-library";

interface RowSelectCheckboxProps {
	selected: boolean;
	onClick: MouseEventHandler<HTMLButtonElement>;
}

const RowSelectCheckbox: FC<RowSelectCheckboxProps> = ({ selected, onClick }) => (
	<button
		type="button"
		onClick={onClick}
		className={cn(
			"flex size-4 flex-none items-center justify-center rounded-[5px] border-[1.5px]",
			selected ? "border-primary bg-primary text-white" : "border-border-strong"
		)}
	>
		{selected ? (
			<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
				<polyline points="20 6 9 17 4 12" />
			</svg>
		) : null}
	</button>
);

RowSelectCheckbox.displayName = 'RowSelectCheckbox';

export { RowSelectCheckbox };
export type { RowSelectCheckboxProps };
