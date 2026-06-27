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
				// Colors are set inline (reading the `finance-theme` tokens this element re-establishes)
				// so they don't depend on Tailwind generating ambiguous `text-[var(--…)]` utilities.
				style={{ background: "var(--text)", color: "var(--surface)" }}
				className={cn(
					// `finance-theme` re-establishes design tokens — Radix portals this to body.
					"finance-theme rounded-lg px-2.5 py-1.5 text-[11.5px] font-medium leading-snug shadow-[var(--shadow-lg)] [&_svg]:bg-[var(--text)] [&_svg]:fill-[var(--text)]",
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
