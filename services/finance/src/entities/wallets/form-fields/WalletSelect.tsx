import type { FC, ReactNode } from "react";
import {
	cn,
	FinanceMenu,
	FinanceMenuTrigger,
	FinanceMenuContent,
	FinanceMenuItem,
} from "@internal/ui-library";
import { Caption, MetaText, Text, textClass } from "@shared/pure-components/typography";

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
						textClass({ size: '13', weight: 'semibold', tone: 'strong' }), "flex w-full items-center gap-2.5 outline-none",
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
					{selected ? <MetaText>{selected.currency}</MetaText> : null}
					<Caption as="span" size="10">▾</Caption>
				</button>
			</FinanceMenuTrigger>
			<FinanceMenuContent align="start" className="w-[var(--radix-popover-trigger-width)] min-w-[220px] p-1">
				{options.length === 0 ? (
					<Caption className="px-3 py-2">{emptyLabel}</Caption>
				) : (
					options.map((option) => (
						<FinanceMenuItem key={option.id} onClick={() => { onChange(option.id); }} className="flex items-center gap-2.5">
							<span className="h-[18px] w-[26px] flex-none rounded-[4px]" style={{ background: option.gradient }} />
							<Text weight="semibold" truncate className="min-w-0 flex-1">{option.name}</Text>
							<MetaText size="10.5">{option.currency}</MetaText>
							{option.id === value ? <Text weight="semibold" tone="accent">✓</Text> : null}
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
