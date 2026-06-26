import {
	UiPopoverContent,
	UiPopoverTrigger,
	UiButton,
	UiPopover,
	Icons,
} from '@internal/ui-library';
import { useState } from "react";
import { getByTag } from 'locale-codes';
import { useSettingsContext } from "@internal/shared";
import { LocalePicker } from "@entity/wallet";

const GlobalLocaleSelection = () => {
	const { locale, onUpdateField } = useSettingsContext();
	const [open, setOpen] = useState(false);

	return (
		<div className="flex gap-4 items-center justify-between">
			<h3>
				Locale
			</h3>
			<UiPopover open={open} onOpenChange={setOpen}>
				<UiPopoverTrigger asChild>
					<UiButton
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-[200px] justify-between"
					>
						{locale
							? getByTag(locale).name
							: "UiSelect locale..."}
						<Icons.ChevronsUpDown className="opacity-50"/>
					</UiButton>
				</UiPopoverTrigger>
				<UiPopoverContent className="w-[200px] p-0">
					<LocalePicker
						value={locale}
						onSelected={(value) => {
							setOpen(false)
							onUpdateField('locale', value);
						}} />
				</UiPopoverContent>
			</UiPopover>
		</div>
	)
}

export { GlobalLocaleSelection };