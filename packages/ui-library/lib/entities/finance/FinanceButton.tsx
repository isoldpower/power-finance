import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";
import { Button } from "@/entities/shadcn";

const financeButtonVariants = cva(
	"rounded-[var(--radius-md)] font-semibold transition-[filter,background-color,border-color,box-shadow,transform] active:translate-y-px",
	{
		variants: {
			variant: {
				primary:
					"bg-[image:var(--accent-grad)] text-white shadow-[0_3px_10px_var(--glow)] hover:brightness-95",
				outline:
					"border border-border-strong bg-transparent text-foreground shadow-none hover:bg-secondary",
				ghost:
					"bg-transparent text-text-2 shadow-none hover:bg-secondary hover:text-foreground",
				danger:
					"bg-neg text-white shadow-none hover:brightness-95",
			},
			size: {
				sm: "h-8 px-3 text-xs",
				md: "h-9 px-4 text-sm",
				lg: "h-10 px-6 text-sm",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "md",
		},
	}
);

type FinanceButtonProps = Omit<React.ComponentProps<typeof Button>, "variant" | "size"> &
	VariantProps<typeof financeButtonVariants>

function FinanceButton({ className, variant, size, ...props }: FinanceButtonProps) {
	return (
		<Button
			variant="ghost"
			data-finance-variant={variant ?? "primary"}
			className={cn(financeButtonVariants({ variant, size }), className)}
			{...props}
		/>
	);
}

export { FinanceButton, financeButtonVariants };
export type { FinanceButtonProps };
