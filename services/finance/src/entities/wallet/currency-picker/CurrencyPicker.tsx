import type { FC, ReactNode } from "react";
import { codes, code } from 'currency-codes';

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
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
		<Command>
			<CommandInput placeholder="Search currency..." className="h-9"/>
			<CommandList>
				<CommandEmpty>
					{notFound ?? "No currency found."}
				</CommandEmpty>
				<CommandGroup>
					{labeledCurrencies.map((currency) => (
						<CommandItem
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
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	)
}

CurrencyPicker.displayName = 'CurrencyPicker';

export { CurrencyPicker };
export type { CurrencyPickerProps };