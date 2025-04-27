import {
	PopoverContent,
	PopoverTrigger,
	Button,
	Popover,
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
			<h3 className="text-neutral-600">
				Locale
			</h3>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-[200px] justify-between"
					>
						{locale
							? getByTag(locale)?.name ?? locale
							: "Select locale..."}
						<Icons.ChevronsUpDown className="opacity-50"/>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0">
					<LocalePicker
						value={locale}
						onSelected={(value) => {
							setOpen(false)
							onUpdateField('locale', value);
						}} />
				</PopoverContent>
			</Popover>
		</div>
	)
}

export { GlobalLocaleSelection };