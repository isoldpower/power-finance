import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";
import { Badge } from "@/entities/shadcn";

const financeBadgeVariants = cva("rounded-full font-bold leading-none", {
	variants: {
		tone: {
			pos: "border-transparent bg-pos-soft text-pos",
			neg: "border-transparent bg-neg-soft text-neg",
			warn: "border-transparent bg-warn-soft text-warn",
			viol: "border-transparent bg-viol-soft text-viol",
			accent: "border-transparent bg-accent-soft text-primary",
			neutral: "border-border-strong text-text-3",
			solid: "border-transparent bg-[image:var(--accent-grad)] text-white",
		},
		size: {
			sm: "px-2 py-0.5 text-[10px]",
			md: "px-2.5 py-1 text-xs",
		},
	},
	defaultVariants: {
		tone: "accent",
		size: "md",
	},
})

type FinanceBadgeProps = Omit<React.ComponentProps<typeof Badge>, "variant"> &
	VariantProps<typeof financeBadgeVariants> & {
		dot?: boolean
	};

function FinanceBadge({ className, tone, size, dot = false, children, ...props }: FinanceBadgeProps) {
	return (
		<Badge variant="outline" className={cn(financeBadgeVariants({ tone, size }), className)} {...props}>
			{dot && <span className="size-1.5 rounded-full bg-current" aria-hidden />}
			{children}
		</Badge>
	);
}

export { FinanceBadge, financeBadgeVariants };
export type { FinanceBadgeProps };
