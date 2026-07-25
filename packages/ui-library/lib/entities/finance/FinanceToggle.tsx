import * as React from "react";

import { cn } from "@/utils";
import { Toggle } from "@/entities/shadcn";

type FinanceToggleProps = React.ComponentProps<typeof Toggle>;

function FinanceToggle({ className, ...props }: FinanceToggleProps) {
	return (
		<Toggle
			className={cn(
				"h-auto min-w-0 flex-none cursor-pointer rounded-[var(--radius-sm)] border border-transparent px-1 py-0.5 text-[11px] leading-none font-semibold text-text-3 transition-colors",
				"hover:bg-transparent hover:text-text-2",
				"focus-visible:border-[var(--accent-border)] focus-visible:ring-0",
				"data-[state=on]:border-[var(--accent-border)] data-[state=on]:bg-[var(--accent-soft)] data-[state=on]:text-primary",
				className
			)}
			{...props}
		/>
	);
}

export { FinanceToggle };
export type { FinanceToggleProps };
