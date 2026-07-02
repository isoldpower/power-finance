import {
	UiPopoverContent,
	UiPopoverTrigger,
	UiButton,
	UiPopover,
	Icons,
} from '@internal/ui-library';
import { code } from "currency-codes";
import { CurrencyPicker } from "@entity/wallets";
import { useSettingsContext } from "@internal/shared";
import { useDisclosure } from "@shared/interactions";

const PreferredCurrencySelection = () => {
	const { mainCurrency, onUpdateField } = useSettingsContext();
	const { open, setOpen, onClose } = useDisclosure();

	return (
		<div className="flex gap-4 items-center justify-between">
			<h3>Main currency</h3>
			<UiPopover open={open} onOpenChange={setOpen}>
				<UiPopoverTrigger asChild>
					<UiButton
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-[200px] justify-between"
					>
						{mainCurrency
							? code(mainCurrency)?.currency ?? mainCurrency
							: "UiSelect currency..."}
						<Icons.ChevronsUpDown className="opacity-50"/>
					</UiButton>
				</UiPopoverTrigger>
				<UiPopoverContent className="finance-theme w-[200px] p-0">
					<CurrencyPicker
						value={mainCurrency}
						onSelected={(value) => {
							onClose()
							// cmdk lowercases the selected value; currency codes (and the FX rate table) are uppercase.
							if (value) onUpdateField('mainCurrency', value.toUpperCase());
						}} />
				</UiPopoverContent>
			</UiPopover>
		</div>
	)
}

export { PreferredCurrencySelection };