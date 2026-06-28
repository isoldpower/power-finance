import type { FC, ReactNode } from "react";
import { cn } from "@internal/ui-library";

interface PageButtonProps {
	active?: boolean;
	disabled?: boolean;
	onClick: () => void;
	children: ReactNode;
}

const PageButton: FC<PageButtonProps> = ({ active = false, disabled = false, onClick, children }) => (
	<button
		type="button"
		disabled={disabled}
		onClick={onClick}
		className={cn(
			"flex h-7 min-w-7 items-center justify-center rounded-[var(--radius-md)] border px-2 text-xs font-semibold transition-colors",
			active ? "border-primary bg-primary text-white" : "border-border-strong text-text-2 hover:bg-secondary",
			disabled && "cursor-not-allowed opacity-40 hover:bg-transparent"
		)}
	>
		{children}
	</button>
);

PageButton.displayName = 'PageButton';

export { PageButton };
export type { PageButtonProps };
