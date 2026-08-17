import { Text } from "@shared/pure-components/typography";

import type { FC } from "react";


interface LocalePickerOptionSelectedProps {
	children: boolean;
}

const LocalePickerOptionSelected: FC<LocalePickerOptionSelectedProps> = ({ children }) => (
	<Text weight="semibold" tone="accent" className="ml-auto w-3 text-center">
		{children ? '✓' : ''}
	</Text>
);

LocalePickerOptionSelected.displayName = 'LocalePickerOptionSelected';

export { LocalePickerOptionSelected };
export type { LocalePickerOptionSelectedProps };
