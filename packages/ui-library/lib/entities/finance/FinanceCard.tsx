import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";
import { Card } from "@/entities/shadcn";

const financeCardVariants = cva(
	"border bg-card text-card-foreground transition-[background-color,box-shadow,border-color]",
	{
		variants: {
			variant: {
				default: "border-border shadow-[var(--shadow)]",
				elevated: "border-border shadow-[var(--shadow-lg)]",
				accent: "border-[var(--accent-border)] shadow-[var(--shadow-lg)]",
			},
			interactive: {
				true: "cursor-pointer hover:bg-secondary",
				false: "",
			},
			radius: {
				md: "rounded-[var(--radius-md)]",
				lg: "rounded-[var(--radius-lg)]",
			},
		},
		defaultVariants: {
			variant: "default",
			interactive: false,
			radius: "lg",
		},
	}
);

type FinanceCardProps = React.ComponentProps<typeof Card> &
	VariantProps<typeof financeCardVariants>

function FinanceCard({ className, variant, interactive, radius, ...props }: FinanceCardProps) {
	return (
		<Card
			className={cn(financeCardVariants({ variant, interactive, radius }), className)}
			{...props}
		/>
	);
}

export {
	CardContent as FinanceCardContent,
	CardHeader as FinanceCardHeader,
	CardTitle as FinanceCardTitle,
	CardDescription as FinanceCardDescription,
	CardFooter as FinanceCardFooter,
} from "@/entities/shadcn";
export { FinanceCard, financeCardVariants };
export type { FinanceCardProps };
