import { useId } from "react";
import { WalletSelect } from "@entity/wallets";

import { DEFAULT_SEARCH_PLACEHOLDER, NO_MATCH_LABEL } from "./config.ts";
import { useWalletCombobox } from "./use-wallet-combobox.ts";

import type { FC, ReactNode } from "react";
import type { WalletSelectItem } from "@entity/wallets";


interface WalletComboboxProps {
	options: WalletSelectItem[];
	selected: WalletSelectItem | undefined;
	emptyLabel: string;
	placeholder: string;
	searchPlaceholder?: string;
	leadingIcon?: ReactNode;
	showSwatch?: boolean;
	className?: string;
	onSelect: (id: string) => void;
}

const WalletCombobox: FC<WalletComboboxProps> = ({
	options,
	selected,
	emptyLabel,
	placeholder,
	searchPlaceholder = DEFAULT_SEARCH_PLACEHOLDER,
	leadingIcon,
	showSwatch = true,
	className,
	onSelect,
}) => {
	const listId = useId();
	const {
		open,
		query,
		matches,
		highlighted,
		inputRef,
		setOpen,
		setQuery,
		highlight,
		choose,
		onKeyDown,
	} = useWalletCombobox({ options, onSelect });

	const optionId = (index: number): string => `${listId}-option-${index.toString()}`;

	return (
		<WalletSelect open={open} onOpenChange={setOpen}>
			<WalletSelect.Trigger className={className}>
				{leadingIcon}
				{showSwatch && selected ? <WalletSelect.Swatch gradient={selected.gradient} /> : null}
				<WalletSelect.Value placeholder={!selected}>
					{selected ? selected.name : placeholder}
				</WalletSelect.Value>
				{selected ? (
					<WalletSelect.Currency>
						{selected.currency}
					</WalletSelect.Currency>
				) : null}
				<WalletSelect.Caret />
			</WalletSelect.Trigger>
			<WalletSelect.Options>
				{options.length === 0 ? (
					<WalletSelect.Empty>
						{emptyLabel}
					</WalletSelect.Empty>
				) : (
					<>
						<WalletSelect.Search
							value={query}
							placeholder={searchPlaceholder}
							inputRef={inputRef}
							controls={listId}
							activeOption={highlighted < 0 ? undefined : optionId(highlighted)}
							onValueChange={setQuery}
							onKeyDown={onKeyDown}
						/>
						<WalletSelect.List id={listId} label="Wallets">
							{matches.length === 0 ? (
								<WalletSelect.Empty>
									{NO_MATCH_LABEL}
								</WalletSelect.Empty>
							) : (
								matches.map((option, index) => (
									<WalletSelect.Option
										key={option.id}
										id={optionId(index)}
										selected={option.id === selected?.id}
										highlighted={index === highlighted}
										onSelect={() => { choose(option.id); }}
										onHighlight={() => { highlight(index); }}
									>
										<WalletSelect.Swatch gradient={option.gradient} />
										<WalletSelect.OptionName>
											{option.name}
										</WalletSelect.OptionName>
										<WalletSelect.Currency size="10.5">
											{option.currency}
										</WalletSelect.Currency>
										{option.id === selected?.id ? <WalletSelect.Selected /> : null}
									</WalletSelect.Option>
								))
							)}
						</WalletSelect.List>
					</>
				)}
			</WalletSelect.Options>
		</WalletSelect>
	);
};

WalletCombobox.displayName = 'WalletCombobox';

export { WalletCombobox };
export type { WalletComboboxProps };
