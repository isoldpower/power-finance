import type { FC, ReactNode } from "react";
import { cn } from "@internal/ui-library";
import { textClass } from "@shared/pure-components/typography";

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
			textClass({ size: 'xs', weight: 'semibold' }), "flex h-7 min-w-7 items-center justify-center rounded-[var(--radius-md)] border px-2 transition-colors",
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
