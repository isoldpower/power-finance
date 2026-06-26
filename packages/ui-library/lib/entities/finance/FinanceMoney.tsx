import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";

const financeMoneyVariants = cva(
	"font-display font-semibold tabular-nums", 
	{
		variants: {
			tone: {
				pos: "text-pos",
				neg: "text-neg",
				neutral: "text-foreground",
				muted: "text-text-2",
			},
			size: {
				sm: "text-sm",
				md: "text-[17px]",
				lg: "text-[22px]",
				xl: "text-[30px] tracking-[-0.01em]",
				display: "text-5xl tracking-[-0.02em]",
			},
		},
		defaultVariants: {
			tone: "neutral",
			size: "md",
		},
	}
);

type FinanceMoneyProps = React.ComponentProps<"span"> &
	VariantProps<typeof financeMoneyVariants>;

function FinanceMoney({ className, tone, size, ...props }: FinanceMoneyProps) {
	return <span className={cn(financeMoneyVariants({ tone, size }), className)} {...props} />;
}

export { FinanceMoney, financeMoneyVariants };
export type { FinanceMoneyProps };
