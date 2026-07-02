import {FC, ReactNode} from "react";

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
import { getByTag } from "locale-codes";


interface LocalePickerProps {
	notFound?: ReactNode;
	onSelected?: (value: string) => void;
	value?: string;
}

const LocalePicker: FC<LocalePickerProps> = ({ onSelected, value, notFound }) => {
	const locales = ['en-US', 'fr-FR', 'de-DE', 'es-ES', 'it-IT'];
	const supportedLocales = Intl.NumberFormat.supportedLocalesOf(locales);
	const labeledLocales = supportedLocales.map((item) => ({
		value: item,
		label: getByTag(item).name,
	}));

	return (
		<UiCommand>
			<UiCommandInput placeholder="Search locale..." className="h-9"/>
			<UiCommandList>
				<UiCommandEmpty>
					{notFound ?? "No locale found."}
				</UiCommandEmpty>
				<UiCommandGroup>
					{labeledLocales.map((locale) => (
						<UiCommandItem
							key={locale.value}
							value={locale.value}
							onSelect={(currentValue) => {
								if (onSelected) onSelected(currentValue === value ? "" : currentValue)
							}}
						>
							{locale.label}
							<Icons.Check
								className={cn(
									"ml-auto",
									value === locale.value ? "opacity-100" : "opacity-0"
								)}
							/>
						</UiCommandItem>
					))}
				</UiCommandGroup>
			</UiCommandList>
		</UiCommand>
	)
}

LocalePicker.displayName = 'LocalePicker';

export { LocalePicker };
export type { LocalePickerProps };