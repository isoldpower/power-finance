import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";

const financeStatValue = cva(
	"font-display font-semibold tabular-nums leading-none", 
	{
		variants: {
			size: {
				sm: "text-[17px]",
				md: "text-[22px]",
				lg: "text-[30px] tracking-[-0.01em]",
			},
		},
		defaultVariants: {
			size: "md",
		},
	}
);

type FinanceStatProps = Omit<React.ComponentProps<"div">, "children"> &
	VariantProps<typeof financeStatValue> & {
		label: React.ReactNode;
		value: React.ReactNode;
		valueClassName?: string;
	};

function FinanceStat({ className, size, label, value, valueClassName, ...props }: FinanceStatProps) {
	return (
		<div className={cn("flex flex-col gap-1.5", className)} {...props}>
			<span className="font-numeric text-[10.5px] uppercase leading-none tracking-[0.14em] text-text-3">
				{label}
			</span>
			<span className={cn(financeStatValue({ size }), valueClassName)}>{value}</span>
		</div>
	);
}

export { FinanceStat, financeStatValue };
export type { FinanceStatProps };
