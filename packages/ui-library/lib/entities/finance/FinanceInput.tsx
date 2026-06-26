import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";
import { Input } from "@/entities/shadcn";

const financeInputVariants = cva("transition-[color,box-shadow,border-color]", {
	variants: {
		variant: {
			default:
				"h-10 rounded-[var(--radius-md)] border-border-strong bg-transparent px-3.5 text-[13px] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-[var(--accent-soft)]",
			bare:
				"h-auto border-0 bg-transparent p-0 font-display text-3xl font-semibold shadow-none focus-visible:ring-0 dark:bg-transparent",
		},
	},
	defaultVariants: {
		variant: "default",
	},
})

type FinanceInputProps = React.ComponentProps<typeof Input> &
	VariantProps<typeof financeInputVariants>

function FinanceInput({ className, variant, ...props }: FinanceInputProps) {
	return <Input className={cn(financeInputVariants({ variant }), className)} {...props} />
}

export { FinanceInput, financeInputVariants };
export type { FinanceInputProps };
