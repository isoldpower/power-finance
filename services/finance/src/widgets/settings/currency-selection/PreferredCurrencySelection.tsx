import {
	PopoverContent,
	PopoverTrigger,
	Button,
	Popover,
	Icons,
} from '@internal/ui-library';
import { useState } from "react";
import { code } from "currency-codes";
import { CurrencyPicker } from "@entity/wallet";
import { useSettingsContext } from "@internal/shared";

const PreferredCurrencySelection = () => {
	const { mainCurrency, onUpdateField } = useSettingsContext();
	const [open, setOpen] = useState(false);

	return (
		<div className="flex gap-4 items-center justify-between">
			<h3>Main currency</h3>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-[200px] justify-between"
					>
						{mainCurrency
							? code(mainCurrency)?.currency ?? mainCurrency
							: "Select currency..."}
						<Icons.ChevronsUpDown className="opacity-50"/>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0">
					<CurrencyPicker
						value={mainCurrency}
						onSelected={(value) => {
							setOpen(false)
							onUpdateField('mainCurrency', value);
						}} />
				</PopoverContent>
			</Popover>
		</div>
	)
}

export { PreferredCurrencySelection };