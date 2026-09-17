import {
	cn,
	FinanceCombobox,
	FinanceComboboxContent,
	FinanceComboboxEmpty,
	FinanceComboboxInput,
	FinanceComboboxItem,
	FinanceComboboxList,
	FinanceComboboxTrigger,
} from "@internal/ui-library";

import { CheckIcon } from "@shared/pure-components/icons";

import type { FC } from "react";
import type { SelectOption } from "@shared/forms";


interface RuleValueComboboxProps {
	label: string;
	unset: boolean;
	options: SelectOption[];
	selected?: string[];
	searchPlaceholder: string;
	emptyLabel: string;
	ariaLabel: string;
	className?: string;
	disabled?: boolean;
	onSelect: (value: string) => void;
}

const NO_SELECTION: string[] = [];

const RuleValueCombobox: FC<RuleValueComboboxProps> = ({
	label,
	unset,
	options,
	selected = NO_SELECTION,
	searchPlaceholder,
	emptyLabel,
	ariaLabel,
	className,
	disabled,
	onSelect,
}) => (
	<FinanceCombobox>
		<FinanceComboboxTrigger
			aria-label={ariaLabel}
			disabled={disabled}
			className={cn(
				"h-10 w-full rounded-[var(--radius-md)] bg-transparent px-3.5 text-[12px] font-normal",
				unset && "text-text-3",
				className
			)}
		>
			<span className="truncate" title={label}>{label}</span>
		</FinanceComboboxTrigger>
		<FinanceComboboxContent>
			<FinanceComboboxInput placeholder={searchPlaceholder} />
			<FinanceComboboxList>
				<FinanceComboboxEmpty>{emptyLabel}</FinanceComboboxEmpty>
				{options.map((option) => (
					<FinanceComboboxItem
						key={option.value}
						value={option.value}
						keywords={[option.label]}
						onSelect={() => { onSelect(option.value); }}
					>
						{selected.includes(option.value) ? (
							<CheckIcon size={14} className="flex-none text-primary" />
						) : (
							<span aria-hidden className="size-3.5 flex-none" />
						)}
						<span className="min-w-0 truncate">{option.label}</span>
					</FinanceComboboxItem>
				))}
			</FinanceComboboxList>
		</FinanceComboboxContent>
	</FinanceCombobox>
);

RuleValueCombobox.displayName = 'RuleValueCombobox';

export { RuleValueCombobox };
export type { RuleValueComboboxProps };
