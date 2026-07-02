import type { FC, ReactNode } from "react";
import { codes, code } from 'currency-codes';

import {
	UiCommand,
	UiCommandEmpty,
	UiCommandGroup,
	UiCommandInput,
	UiCommandItem,
	UiCommandList,
	Icons,
	cn
} from "@internal/ui-library";

interface CurrencyPickerProps {
	notFound?: ReactNode;
	onSelected?: (value: string) => void;
	value?: string;
}

const CurrencyPicker: FC<CurrencyPickerProps> = ({ onSelected, value, notFound }) => {
	const labeledCurrencies = codes().map((item) => ({
		value: item,
		label: code(item)?.currency ?? item,
	}));

	return (
		<UiCommand>
			<UiCommandInput placeholder="Search currency..." className="h-9"/>
			<UiCommandList>
				<UiCommandEmpty>
					{notFound ?? "No currency found."}
				</UiCommandEmpty>
				<UiCommandGroup>
					{labeledCurrencies.map((currency) => (
						<UiCommandItem
							key={currency.value}
							value={currency.value}
							onSelect={(currentValue) => {
								if (onSelected) onSelected(currentValue === value ? "" : currentValue);
							}}
						>
							{currency.label}
							<Icons.Check
								className={cn(
									"ml-auto",
									value === currency.value ? "opacity-100" : "opacity-0"
								)}
							/>
						</UiCommandItem>
					))}
				</UiCommandGroup>
			</UiCommandList>
		</UiCommand>
	)
}

CurrencyPicker.displayName = 'CurrencyPicker';

export { CurrencyPicker };
export type { CurrencyPickerProps };