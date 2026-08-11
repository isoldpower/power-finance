import type { FC } from "react";
import { Text } from "@shared/pure-components/typography";


interface LocalePickerOptionSelectedProps {
	children: boolean;
}

const LocalePickerOptionSelected: FC<LocalePickerOptionSelectedProps> = ({
	children,
}) => {
	return (
		<Text weight="semibold" tone="accent" className="ml-auto w-3 text-center">
			{children ? '✓' : ''}
		</Text>
	);
}

export { LocalePickerOptionSelected };
