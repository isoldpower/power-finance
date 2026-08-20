import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/utils";
import { Select, SelectValue } from "@/entities/shadcn";

const FinanceSelect = Select;
const FinanceSelectValue = SelectValue;

function FinanceSelectTrigger({
	className,
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
	return (
		<SelectPrimitive.Trigger
			className={cn(
				"flex min-w-0 cursor-pointer items-center justify-between gap-1.5 rounded-[var(--radius-md)] border border-border-strong bg-surface px-2 py-1.5 text-[12px] font-semibold whitespace-nowrap text-text-2 outline-none transition-[border-color,box-shadow]",
				"focus-visible:border-[var(--accent-border)] data-[state=open]:border-[var(--accent-border)]",
				"disabled:cursor-not-allowed disabled:opacity-50",
				"*:data-[slot=select-value]:truncate",
				className
			)}
			{...props}
		>
			{children}
			<SelectPrimitive.Icon asChild>
				<ChevronDownIcon className="size-3.5 flex-none text-text-3" />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
}

function FinanceSelectContent({
	className,
	children,
	sideOffset = 6,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				position="popper"
				sideOffset={sideOffset}
				className={cn(
					"finance-theme z-50 max-h-[var(--radix-select-content-available-height)] min-w-[max(170px,var(--radix-select-trigger-width))] overflow-x-hidden overflow-y-auto rounded-[var(--radius-md)] border border-border-strong bg-popover py-1 text-foreground shadow-[var(--shadow-lg)]",
					"data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-1 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
					className
				)}
				{...props}
			>
				<SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	);
}

function FinanceSelectItem({
	className,
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
	return (
		<SelectPrimitive.Item
			className={cn(
				"flex cursor-pointer items-center gap-2 px-[13px] py-2 text-[12.5px] font-medium whitespace-nowrap text-text-2 outline-none select-none",
				"focus:bg-secondary",
				"data-[state=checked]:bg-[var(--accent-soft)] data-[state=checked]:font-semibold data-[state=checked]:text-primary",
				"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				className
			)}
			{...props}
		>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
}

export { FinanceSelect, FinanceSelectValue, FinanceSelectTrigger, FinanceSelectContent, FinanceSelectItem };
