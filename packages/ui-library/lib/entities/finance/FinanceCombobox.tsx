import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { ChevronsUpDownIcon, SearchIcon } from "lucide-react";

import { cn } from "@/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/entities/shadcn";

interface FinanceComboboxContextType {
	close: () => void;
}

const FinanceComboboxContext = React.createContext<FinanceComboboxContextType | null>(null);

function useFinanceComboboxContext(component: string): FinanceComboboxContextType {
	const context = React.use(FinanceComboboxContext);

	if (!context) {
		throw new Error(`${component} must be used within FinanceCombobox`);
	}

	return context;
}

function FinanceCombobox({
	open,
	defaultOpen,
	onOpenChange,
	children,
	...props
}: React.ComponentProps<typeof Popover>) {
	const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen ?? false);
	const isControlled = open !== undefined;

	const handleOpenChange = React.useCallback((next: boolean) => {
		if (!isControlled) setUncontrolledOpen(next);
		onOpenChange?.(next);
	}, [isControlled, onOpenChange]);

	const contextValue = React.useMemo<FinanceComboboxContextType>(() => ({
		close: () => { handleOpenChange(false); },
	}), [handleOpenChange]);

	return (
		<FinanceComboboxContext value={contextValue}>
			<Popover
				open={isControlled ? open : uncontrolledOpen}
				onOpenChange={handleOpenChange}
				{...props}
			>
				{children}
			</Popover>
		</FinanceComboboxContext>
	);
}

function FinanceComboboxTrigger({
	className,
	children,
	...props
}: React.ComponentProps<typeof PopoverTrigger>) {
	return (
		<PopoverTrigger
			role="combobox"
			className={cn(
				"flex min-w-0 cursor-pointer items-center justify-between gap-1.5 rounded-[var(--radius-sm)] border border-border-strong bg-surface px-3 py-1.5 text-[12.5px] font-semibold whitespace-nowrap text-text-2 outline-none transition-[border-color,box-shadow]",
				"focus-visible:border-[var(--accent-border)] data-[state=open]:border-[var(--accent-border)]",
				"disabled:cursor-not-allowed disabled:opacity-50",
				className
			)}
			{...props}
		>
			{children}
			<ChevronsUpDownIcon className="size-2.5 flex-none text-text-3" />
		</PopoverTrigger>
	);
}

// Which edge of the trigger the popover hangs off. Horizontal pivots keep the
// default side, vertical pivots keep the default alignment.
type FinanceComboboxPivot = 'start' | 'center' | 'end' | 'top' | 'bottom';

type FinanceComboboxContentProps = React.ComponentProps<typeof PopoverContent> & {
	pivot?: FinanceComboboxPivot;
};

function resolvePivot(pivot: FinanceComboboxPivot | undefined) {
	switch (pivot) {
		case 'start':
		case 'center':
		case 'end':
			return { align: pivot } as const;
		case 'top':
		case 'bottom':
			return { side: pivot } as const;
		default:
			return {} as const;
	}
}

function FinanceComboboxContent({
	className,
	align = "start",
	side,
	pivot,
	sideOffset = 6,
	children,
	...props
}: FinanceComboboxContentProps) {
	const pivoted = resolvePivot(pivot);

	return (
		<PopoverContent
			align={pivoted.align ?? align}
			side={pivoted.side ?? side}
			sideOffset={sideOffset}
			className={cn(
				"finance-theme w-[max(220px,var(--radix-popover-trigger-width))] overflow-hidden rounded-[var(--radius-md)] border-border-strong bg-popover p-0 text-foreground shadow-[var(--shadow-lg)]",
				className
			)}
			{...props}
		>
			<CommandPrimitive className="flex w-full flex-col overflow-hidden">
				{children}
			</CommandPrimitive>
		</PopoverContent>
	);
}

function FinanceComboboxInput({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
	return (
		<div className="flex items-center gap-2 border-b border-border-strong px-2.5 py-[7px]">
			<SearchIcon className="size-3.5 flex-none text-text-3" />
			<CommandPrimitive.Input
				className={cn(
					"min-w-0 flex-1 [font-family:inherit] border-none bg-transparent text-[13px] text-foreground outline-none placeholder:text-text-3",
					className
				)}
				{...props}
			/>
		</div>
	);
}

function FinanceComboboxList({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
	return (
		<CommandPrimitive.List
			className={cn("max-h-[260px] scroll-py-1 overflow-x-hidden overflow-y-auto p-1", className)}
			{...props}
		/>
	);
}

function FinanceComboboxEmpty({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
	return (
		<CommandPrimitive.Empty
			className={cn("py-6 text-center text-[12.5px] text-text-3", className)}
			{...props}
		/>
	);
}

type FinanceComboboxItemProps = Omit<React.ComponentProps<typeof CommandPrimitive.Item>, "onSelect"> & {
	onSelect?: () => void;
};

function FinanceComboboxItem({
	className,
	onSelect,
	...props
}: FinanceComboboxItemProps) {
	const { close } = useFinanceComboboxContext("FinanceComboboxItem");

	return (
		<CommandPrimitive.Item
			onSelect={() => {
				onSelect?.();
				close();
			}}
			className={cn(
				"flex w-full cursor-pointer items-center gap-2.5 rounded-[var(--radius-sm)] px-3 py-2 text-left text-[13px] text-foreground outline-none",
				"data-[selected=true]:bg-secondary",
				className
			)}
			{...props}
		/>
	);
}

export {
	FinanceCombobox,
	FinanceComboboxTrigger,
	FinanceComboboxContent,
	FinanceComboboxInput,
	FinanceComboboxList,
	FinanceComboboxEmpty,
	FinanceComboboxItem,
};
export type { FinanceComboboxItemProps, FinanceComboboxContentProps, FinanceComboboxPivot };
