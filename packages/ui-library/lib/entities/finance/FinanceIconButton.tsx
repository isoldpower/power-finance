import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";
import { Button } from "@/entities/shadcn";

const financeIconButtonVariants = cva(
	"relative inline-flex items-center justify-center rounded-[var(--radius-md)] border transition-[background-color,border-color,color,box-shadow] [&_svg:not([class*='size-'])]:size-[18px]",
	{
		variants: {
			variant: {
				default:
					"border-border-strong bg-transparent text-text-2 hover:bg-secondary hover:text-foreground",
				active:
					"border-[var(--accent-border)] bg-accent-soft text-primary",
			},
			size: {
				sm: "size-8",
				md: "size-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	}
);

type FinanceIconButtonProps = Omit<React.ComponentProps<typeof Button>, "variant" | "size"> &
	VariantProps<typeof financeIconButtonVariants>

function FinanceIconButton({ className, variant, size, ...props }: FinanceIconButtonProps) {
	return (
		<Button
			variant="ghost"
			size="icon"
			className={cn(financeIconButtonVariants({ variant, size }), className)}
			{...props}
		/>
	)
}

export { FinanceIconButton, financeIconButtonVariants };
export type { FinanceIconButtonProps };
