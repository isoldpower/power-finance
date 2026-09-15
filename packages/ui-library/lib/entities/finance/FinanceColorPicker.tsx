import * as React from "react";

import { cn } from "@/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/entities/shadcn";
import { FinanceInput } from "./FinanceInput.tsx";

const HEX_PATTERN = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/

const isHex = (value: string): boolean => HEX_PATTERN.test(value)

const withHash = (value: string): string => (value.startsWith("#") ? value : `#${value}`)

type FinanceColorSwatchProps = React.ComponentProps<"button"> & {
	color: string
	selected?: boolean
}

function FinanceColorSwatch({ color, selected = false, className, ...props }: FinanceColorSwatchProps) {
	return (
		<button
			type="button"
			aria-label={color}
			aria-pressed={selected}
			style={{ background: color }}
			className={cn(
				"size-7 rounded-full outline-none transition-[box-shadow,transform]",
				"hover:scale-110 focus-visible:ring-[3px] focus-visible:ring-[var(--accent-soft)]",
				selected && "ring-2 ring-foreground ring-offset-2 ring-offset-popover",
				className
			)}
			{...props}
		/>
	)
}

type FinanceColorPickerProps = {
	value: string
	onValueChange: (color: string) => void
	colors: string[]
	disabled?: boolean
	label?: string
	className?: string
	contentClassName?: string
}

function FinanceColorPicker({
	value,
	onValueChange,
	colors,
	disabled = false,
	label = "Pick a colour",
	className,
	contentClassName,
}: FinanceColorPickerProps) {
	const [draft, setDraft] = React.useState<string>(value)

	React.useEffect(() => { setDraft(value) }, [value])

	const commitDraft = React.useCallback((next: string) => {
		const candidate = withHash(next.trim())
		setDraft(candidate)

		if (isHex(candidate)) onValueChange(candidate)
	}, [onValueChange])

	const handleDraftChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		commitDraft(event.target.value)
	}, [commitDraft])

	const handleSwatchSelect = React.useCallback((color: string) => {
		onValueChange(color)
	}, [onValueChange])

	return (
		<Popover>
			<PopoverTrigger asChild disabled={disabled}>
				<button
					type="button"
					aria-label={label}
					disabled={disabled}
					className={cn(
						"flex h-10 w-full items-center gap-3 rounded-[var(--radius-md)] border border-border-strong px-3.5",
						"text-[13px] text-foreground outline-none transition-[color,box-shadow,border-color]",
						"focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-[var(--accent-soft)]",
						"disabled:cursor-not-allowed disabled:opacity-50",
						className
					)}
				>
					<span
						style={{ background: value }}
						className="size-5 shrink-0 rounded-full border border-border"
					/>
					<span className="font-mono uppercase">{value}</span>
				</button>
			</PopoverTrigger>
			<PopoverContent
				align="start"
				sideOffset={6}
				className={cn(
					"finance-theme w-auto rounded-[var(--radius-md)] border-border-strong bg-popover p-3.5 text-foreground shadow-[var(--shadow-lg)]",
					contentClassName
				)}
			>
				<div className="grid grid-cols-6 gap-2.5">
					{colors.map((color) => (
						<FinanceColorSwatch
							key={color}
							color={color}
							selected={color.toLowerCase() === value.toLowerCase()}
							onClick={() => { handleSwatchSelect(color) }}
						/>
					))}
				</div>
				<div className="mt-3.5 flex items-center gap-2.5 border-t border-border pt-3.5">
					<span className="text-[11.5px] font-medium text-text-2">Custom</span>
					<FinanceInput
						value={draft}
						onChange={handleDraftChange}
						spellCheck={false}
						aria-label="Custom colour"
						aria-invalid={!isHex(draft)}
						className="h-8 w-28 font-mono text-[12px] uppercase"
					/>
				</div>
			</PopoverContent>
		</Popover>
	)
}

export { FinanceColorPicker, FinanceColorSwatch };
export type { FinanceColorPickerProps, FinanceColorSwatchProps };
