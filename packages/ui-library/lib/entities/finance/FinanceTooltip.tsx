import * as React from "react";

import { cn } from "@/utils";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/entities/shadcn";

type FinanceTooltipProps = {
	content: React.ReactNode
	children: React.ReactNode
	side?: React.ComponentProps<typeof TooltipContent>["side"]
	className?: string
}

function FinanceTooltip({ content, children, side = "top", className }: FinanceTooltipProps) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>{children}</TooltipTrigger>
			<TooltipContent
				side={side}
				className={cn(
					"rounded-lg bg-[var(--text)] px-2.5 py-1.5 text-[11.5px] font-medium leading-snug text-[var(--surface)] shadow-[var(--shadow-lg)] [&_svg]:bg-[var(--text)] [&_svg]:fill-[var(--text)]",
					className
				)}
			>
				{content}
			</TooltipContent>
		</Tooltip>
	)
}

export { FinanceTooltip };
export type { FinanceTooltipProps };
