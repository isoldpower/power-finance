import type { FC, ReactNode } from "react";
import {
	cn,
	FinanceMenu,
	FinanceMenuTrigger,
	FinanceMenuContent,
	FinanceMenuItem,
} from "@internal/ui-library";

interface WalletSelectOption {
	id: string;
	name: string;
	currency: string;
	gradient: string;
}

interface WalletSelectProps {
	options: WalletSelectOption[];
	value: string;
	onChange: (id: string) => void;
	placeholder?: string;
	emptyLabel?: string;
	variant?: 'boxed' | 'plain';
	showSwatch?: boolean;
	leadingIcon?: ReactNode;
	className?: string;
}

// Designed wallet picker (FinanceMenu dropdown) replacing the native <select>. Presentational —
// callers supply the options (with each wallet's gradient) so it carries no feature dependency.
const WalletSelect: FC<WalletSelectProps> = ({
	options,
	value,
	onChange,
	placeholder = 'Select wallet',
	emptyLabel = 'No wallets',
	variant = 'boxed',
	showSwatch = true,
	leadingIcon,
	className,
}) => {
	const selected = options.find((option) => option.id === value);

	return (
		<FinanceMenu>
			<FinanceMenuTrigger asChild>
				<button
					type="button"
					className={cn(
						"flex w-full items-center gap-2.5 text-[13px] font-semibold text-foreground outline-none",
						variant === 'boxed' && "rounded-[var(--radius-md)] border border-border-strong bg-card px-3.5 py-2.5 hover:bg-secondary",
						className
					)}
				>
					{leadingIcon ?? null}
					{showSwatch && selected ? (
						<span className="h-[18px] w-[26px] flex-none rounded-[4px]" style={{ background: selected.gradient }} />
					) : null}
					<span className={cn("min-w-0 flex-1 truncate text-left", !selected && "text-text-3")}>
						{selected ? selected.name : placeholder}
					</span>
					{selected ? <span className="font-numeric text-[11px] text-text-3">{selected.currency}</span> : null}
					<span className="text-[10px] text-text-3">▾</span>
				</button>
			</FinanceMenuTrigger>
			<FinanceMenuContent align="start" className="w-[var(--radix-popover-trigger-width)] min-w-[220px] p-1">
				{options.length === 0 ? (
					<div className="px-3 py-2 text-[12.5px] text-text-3">{emptyLabel}</div>
				) : (
					options.map((option) => (
						<FinanceMenuItem key={option.id} onClick={() => { onChange(option.id); }} className="flex items-center gap-2.5">
							<span className="h-[18px] w-[26px] flex-none rounded-[4px]" style={{ background: option.gradient }} />
							<span className="min-w-0 flex-1 truncate font-semibold">{option.name}</span>
							<span className="font-numeric text-[10.5px] text-text-3">{option.currency}</span>
							{option.id === value ? <span className="font-semibold text-primary">✓</span> : null}
						</FinanceMenuItem>
					))
				)}
			</FinanceMenuContent>
		</FinanceMenu>
	);
};

WalletSelect.displayName = 'WalletSelect';

export { WalletSelect };
export type { WalletSelectProps, WalletSelectOption };
