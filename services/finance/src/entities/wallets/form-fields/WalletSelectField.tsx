import { WalletSelectCaret } from "./wallet-select/WalletSelectCaret.tsx";
import { WalletSelectCurrency } from "./wallet-select/WalletSelectCurrency.tsx";
import { WalletSelectEmpty } from "./wallet-select/WalletSelectEmpty.tsx";
import { WalletSelectOption } from "./wallet-select/WalletSelectOption.tsx";
import { WalletSelectOptionName } from "./wallet-select/WalletSelectOptionName.tsx";
import { WalletSelectOptions } from "./wallet-select/WalletSelectOptions.tsx";
import { WalletSelectSelected } from "./wallet-select/WalletSelectSelected.tsx";
import { WalletSelectSwatch } from "./wallet-select/WalletSelectSwatch.tsx";
import { WalletSelectTrigger } from "./wallet-select/WalletSelectTrigger.tsx";
import { WalletSelectValue } from "./wallet-select/WalletSelectValue.tsx";
import { FinanceMenu } from "@internal/ui-library";

import type { FC, ReactNode } from "react";
import type { WalletSelectItem } from "./WalletSelect.tsx";


interface WalletSelectFieldProps {
	options: WalletSelectItem[];
	selected: WalletSelectItem | undefined;
	emptyLabel: string;
	placeholder: string;
	leadingIcon?: ReactNode;
	showSwatch?: boolean;
	className?: string;
	onSelect: (id: string) => void;
}

const WalletSelectField: FC<WalletSelectFieldProps> = ({
	options,
	selected,
	emptyLabel,
	placeholder,
	leadingIcon,
	showSwatch = true,
	className,
	onSelect,
}) => (
	<FinanceMenu>
		<WalletSelectTrigger className={className}>
			{leadingIcon}
			{showSwatch && selected ? <WalletSelectSwatch gradient={selected.gradient} /> : null}
			<WalletSelectValue placeholder={!selected}>
				{selected ? selected.name : placeholder}
			</WalletSelectValue>
			{selected ? (
				<WalletSelectCurrency>
					{selected.currency}
				</WalletSelectCurrency>
			) : null}
			<WalletSelectCaret />
		</WalletSelectTrigger>
		<WalletSelectOptions>
			{options.length === 0 ? (
				<WalletSelectEmpty>
					{emptyLabel}
				</WalletSelectEmpty>
			) : (
				options.map((option) => (
					<WalletSelectOption
						key={option.id}
						onSelect={() => { onSelect(option.id); }}
					>
						<WalletSelectSwatch gradient={option.gradient} />
						<WalletSelectOptionName>
							{option.name}
						</WalletSelectOptionName>
						<WalletSelectCurrency size="10.5">
							{option.currency}
						</WalletSelectCurrency>
						{option.id === selected?.id ? <WalletSelectSelected /> : null}
					</WalletSelectOption>
				))
			)}
		</WalletSelectOptions>
	</FinanceMenu>
);

WalletSelectField.displayName = 'WalletSelectField';

export { WalletSelectField };
export type { WalletSelectFieldProps };
