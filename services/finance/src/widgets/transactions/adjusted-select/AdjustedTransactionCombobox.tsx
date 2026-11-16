import { useId, useMemo } from "react";
import { Caption, ShowOn } from "@internal/shared";
import { WalletSelect } from "@entity/wallets";
import { useAdjustedPicker } from "@feature/transactions";

import { ADJUSTED_SEARCH_PLACEHOLDER, NO_ADJUSTED_LABEL, NO_ADJUSTED_MATCH_LABEL } from "./config.ts";
import { useAdjustedOptions } from "./combobox-partials/use-adjusted-options.ts";

import type { FC } from "react";
import type { Transaction } from "@entity/transactions";


interface AdjustedTransactionComboboxProps {
	selected: Transaction | undefined;
	placeholder: string;
	className?: string;
	disabled?: boolean;
	onSelect: (transaction: Transaction | null) => void;
}

const AdjustedTransactionCombobox: FC<AdjustedTransactionComboboxProps> = ({
	selected,
	placeholder,
	className,
	disabled,
	onSelect,
}) => {
	const listId = useId();
	const {
		open,
		query,
		transactions,
		isFetching,
		setQuery,
		handleOpenChange,
		choose,
	} = useAdjustedPicker({ disabled, onSelect });
	const { options, toOption } = useAdjustedOptions(transactions);
	const selectedOption = useMemo(() => (selected ? toOption(selected) : undefined), [selected, toOption]);

	return (
		<WalletSelect open={open} onOpenChange={handleOpenChange}>
			<WalletSelect.Trigger className={className}>
				<WalletSelect.Value placeholder={!selectedOption}>
					{selectedOption?.name ?? placeholder}
				</WalletSelect.Value>
				<ShowOn condition={selectedOption}>
					{(option) => (
						<WalletSelect.Currency>
							{option.amount}
						</WalletSelect.Currency>
					)}
				</ShowOn>
				<WalletSelect.Caret />
			</WalletSelect.Trigger>
			<WalletSelect.Options>
				<WalletSelect.Search
					value={query}
					placeholder={ADJUSTED_SEARCH_PLACEHOLDER}
					controls={listId}
					onValueChange={setQuery}
				/>
				<WalletSelect.List id={listId} label="Transactions">
					<ShowOn condition={selectedOption !== undefined}>
						<WalletSelect.Option
							id={`${listId}-none`}
							selected={false}
							highlighted={false}
							onSelect={() => { choose(null); }}
						>
							<WalletSelect.OptionName>
								{NO_ADJUSTED_LABEL}
							</WalletSelect.OptionName>
						</WalletSelect.Option>
					</ShowOn>
					<ShowOn condition={options.length === 0 && !isFetching}>
						<WalletSelect.Empty>
							{NO_ADJUSTED_MATCH_LABEL}
						</WalletSelect.Empty>
					</ShowOn>
					{options.map((option, index) => (
						<WalletSelect.Option
							key={option.id}
							id={`${listId}-option-${index.toString()}`}
							selected={option.id === selectedOption?.id}
							highlighted={false}
							onSelect={() => { choose(transactions[index] ?? null); }}
						>
							<div className="min-w-0 flex-1">
								<WalletSelect.OptionName>
									{option.name}
								</WalletSelect.OptionName>
								<Caption size="10" className="block">
									{option.date}
								</Caption>
							</div>
							<WalletSelect.Currency size="10.5">
								{option.amount}
							</WalletSelect.Currency>
							<ShowOn condition={option.id === selectedOption?.id}>
								<WalletSelect.Selected />
							</ShowOn>
						</WalletSelect.Option>
					))}
				</WalletSelect.List>
			</WalletSelect.Options>
		</WalletSelect>
	);
};

AdjustedTransactionCombobox.displayName = 'AdjustedTransactionCombobox';

export { AdjustedTransactionCombobox };
export type { AdjustedTransactionComboboxProps };
