import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";
import { Badge } from "@/entities/shadcn";

const financeBadgeVariants = cva(
	"inline-flex items-center gap-1.5 rounded-full border font-bold leading-none whitespace-nowrap", 
	{
		variants: {
			tone: {
				pos: "bg-pos-soft text-pos",
				neg: "bg-neg-soft text-neg",
				warn: "bg-warn-soft text-warn",
				viol: "bg-viol-soft text-viol",
				accent: "bg-accent-soft text-primary",
				neutral: "border-border-strong bg-secondary text-text-3",
				solid: "bg-[image:var(--accent-grad)] text-white",
			},
			appearance: {
				soft: "border-transparent",
				outline: "bg-transparent",
			},
			size: {
				sm: "px-2 py-0.5 text-[10px]",
				md: "px-2.5 py-1 text-xs",
			},
		},
		compoundVariants: [
			{ appearance: "outline", tone: "pos", class: "border-pos text-pos" },
			{ appearance: "outline", tone: "neg", class: "border-[var(--neg-soft)] text-neg" },
			{ appearance: "outline", tone: "warn", class: "border-[var(--warn-soft)] text-warn" },
			{ appearance: "outline", tone: "viol", class: "border-viol text-viol" },
			{ appearance: "outline", tone: "accent", class: "border-[var(--accent-border)] text-primary" },
			{ appearance: "outline", tone: "neutral", class: "border-border-strong text-text-3" },
		],
		defaultVariants: {
			tone: "accent",
			appearance: "soft",
			size: "md",
		},
	}
);

type FinanceBadgeProps = Omit<React.ComponentProps<typeof Badge>, "variant"> &
	VariantProps<typeof financeBadgeVariants> & {
		dot?: boolean
	};

function FinanceBadge({ className, tone, appearance, size, dot = false, children, ...props }: FinanceBadgeProps) {
	return (
		<Badge variant="outline" className={cn(financeBadgeVariants({ tone, appearance, size }), className)} {...props}>
			{dot && <span className="size-1.5 rounded-full bg-current" aria-hidden />}
			{children}
		</Badge>
	);
}

export { FinanceBadge, financeBadgeVariants };
export type { FinanceBadgeProps };
