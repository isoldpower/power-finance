import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";
import { FinanceBadge } from "./FinanceBadge.tsx";

const financeNotificationVariants = cva(
	"flex items-start gap-3 rounded-[var(--radius-lg)] border bg-card p-3.5 shadow-[var(--shadow)]",
	{
		variants: {
			level: {
				alert: "border-l-[3px] border-l-neg",
				warning: "border-l-[3px] border-l-warn",
				info: "border-l-[3px] border-l-primary",
			},
		},
		defaultVariants: {
			level: "info",
		},
	}
);

const iconByLevel = {
	alert: "border-[var(--neg)] text-neg",
	warning: "border-[var(--warn)] text-warn",
	info: "border-[var(--accent-border)] text-primary",
} as const;

const toneByLevel = { alert: "neg", warning: "warn", info: "accent" } as const;
const defaultIconByLevel = { alert: "!", warning: "△", info: "i" } as const;

type FinanceNotificationLevel = "alert" | "warning" | "info";

type FinanceNotificationProps = Omit<React.ComponentProps<"div">, "title"> &
	VariantProps<typeof financeNotificationVariants> & {
		level?: FinanceNotificationLevel;
		title: React.ReactNode;
		subtitle?: React.ReactNode;
		time?: React.ReactNode;
		icon?: React.ReactNode;
	};

function FinanceNotification({
	className,
	level = "info",
	title,
	subtitle,
	time,
	icon,
	...props
}: FinanceNotificationProps) {
	return (
		<div className={cn(financeNotificationVariants({ level }), className)} {...props}>
			<div
				className={cn(
					"flex size-[22px] flex-none items-center justify-center rounded-[5px] border text-xs font-semibold",
					iconByLevel[level]
				)}
			>
				{icon ?? defaultIconByLevel[level]}
			</div>
			<div className="min-w-0 flex-1">
				<div className="flex items-center gap-2 text-[13.5px] font-semibold">
					{title}
					<FinanceBadge tone={toneByLevel[level]} appearance="outline" size="sm" className="capitalize">
						{level}
					</FinanceBadge>
				</div>
				{subtitle ? (
					<div className="mt-0.5 font-numeric text-[11.5px] text-text-2">{subtitle}</div>
				) : null}
			</div>
			{time ? <div className="flex-none text-[11.5px] text-text-3">{time}</div> : null}
		</div>
	);
}

export { FinanceNotification, financeNotificationVariants };
export type { FinanceNotificationProps, FinanceNotificationLevel };
