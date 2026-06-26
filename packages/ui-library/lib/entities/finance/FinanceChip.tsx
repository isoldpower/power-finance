import * as React from "react";

import { cn } from "@/utils";
import { Toggle } from "@/entities/shadcn";

function FinanceChip({ className, ...props }: React.ComponentProps<typeof Toggle>) {
	return (
		<Toggle
			className={cn(
				"h-7 min-w-0 rounded-full border border-border-strong bg-transparent px-3 text-xs font-semibold text-text-2",
				"hover:bg-secondary hover:text-foreground",
				"data-[state=on]:border-[var(--accent-border)] data-[state=on]:bg-accent-soft data-[state=on]:text-primary",
				className
			)}
			{...props}
		/>
	)
}

export { FinanceChip };
