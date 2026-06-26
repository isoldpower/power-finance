import * as React from "react";

import { cn } from "@/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/entities/shadcn";

const FinanceMenu = Popover
const FinanceMenuTrigger = PopoverTrigger

function FinanceMenuContent({
	className,
	align = "end",
	sideOffset = 6,
	...props
}: React.ComponentProps<typeof PopoverContent>) {
	return (
		<PopoverContent
			align={align}
			sideOffset={sideOffset}
			className={cn(
				"w-auto min-w-44 overflow-hidden rounded-[var(--radius-md)] border-border-strong bg-popover p-1 shadow-[var(--shadow-lg)]",
				className
			)}
			{...props}
		/>
	)
}

function FinanceMenuItem({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			role="menuitem"
			tabIndex={0}
			className={cn(
				"flex cursor-pointer items-center gap-2.5 rounded-[var(--radius-sm)] px-3 py-2.5 text-[13px] font-medium text-foreground outline-none transition-colors",
				"hover:bg-secondary focus-visible:bg-secondary",
				className
			)}
			{...props}
		/>
	)
}

export { FinanceMenu, FinanceMenuTrigger, FinanceMenuContent, FinanceMenuItem };
