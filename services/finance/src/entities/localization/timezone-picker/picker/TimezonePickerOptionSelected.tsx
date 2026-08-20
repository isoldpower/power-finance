import { Text } from "@shared/pure-components/typography";

import type { FC } from "react";


interface TimezonePickerOptionSelectedProps {
	children: boolean;
}

const TimezonePickerOptionSelected: FC<TimezonePickerOptionSelectedProps> = ({ children }) => (
	<Text weight="semibold" tone="accent" className="w-3 text-center">
		{children ? '✓' : ''}
	</Text>
);

TimezonePickerOptionSelected.displayName = 'TimezonePickerOptionSelected';

export { TimezonePickerOptionSelected };
export type { TimezonePickerOptionSelectedProps };
