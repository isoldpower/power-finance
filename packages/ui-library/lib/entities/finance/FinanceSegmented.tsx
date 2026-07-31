import * as React from "react";

import { cn } from "@/utils";
import { ToggleGroup, ToggleGroupItem, type ToggleGroupSingleProps } from "@/entities/shadcn";

function FinanceSegmented({
	className,
	...props
}: Omit<ToggleGroupSingleProps, "type">) {
	return (
		<ToggleGroup
			type="single"
			className={cn(
				"w-fit gap-[3px] rounded-[var(--radius-md)] border border-border bg-secondary p-[3px]",
				className
			)}
			{...props}
		/>
	)
}

function FinanceSegmentedItem({
	className,
	accent = false,
	...props
}: React.ComponentProps<typeof ToggleGroupItem> & { accent?: boolean }) {
	return (
		<ToggleGroupItem
			className={cn(
				"flex-none px-3 text-[13px] font-semibold text-text-2",
				"rounded-[calc(var(--radius-md)-4px)] first:rounded-l-[calc(var(--radius-md)-4px)] last:rounded-r-[calc(var(--radius-md)-4px)]",
				"hover:bg-transparent hover:text-foreground",
				accent
					? "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
					: "data-[state=on]:bg-card data-[state=on]:text-foreground data-[state=on]:shadow-sm",
				className
			)}
			{...props}
		/>
	)
}

export { FinanceSegmented, FinanceSegmentedItem };
