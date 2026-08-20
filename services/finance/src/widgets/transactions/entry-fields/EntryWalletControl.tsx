import { UiFormField } from "@internal/ui-library";
import { selectedWalletOption, WalletSelectField } from "@entity/wallets";

import type { FC, ReactNode } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import type { WalletSelectItem } from "@entity/wallets";


interface EntryWalletControlProps<TValues extends FieldValues> {
	control: Control<TValues>;
	name: Path<TValues>;
	options: WalletSelectItem[];
	emptyLabel: string;
	placeholder: string;
	leadingIcon?: ReactNode;
	showSwatch?: boolean;
	className?: string;
	disabled?: boolean;
}

const EntryWalletControl = <TValues extends FieldValues>({
	control,
	name,
	options,
	emptyLabel,
	placeholder,
	leadingIcon,
	showSwatch,
	className,
	disabled,
}: EntryWalletControlProps<TValues>) => (
	<UiFormField
		control={control}
		name={name}
		disabled={disabled}
		render={({ field }) => (
			<WalletSelectField
				options={options}
				selected={selectedWalletOption(options, String(field.value))}
				emptyLabel={emptyLabel}
				placeholder={placeholder}
				leadingIcon={leadingIcon}
				showSwatch={showSwatch}
				className={className}
				onSelect={field.onChange}
			/>
		)}
	/>
);

(EntryWalletControl as FC).displayName = 'EntryWalletControl';

export { EntryWalletControl };
export type { EntryWalletControlProps };
