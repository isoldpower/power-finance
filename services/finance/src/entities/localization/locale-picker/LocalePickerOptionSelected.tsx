import type { FC } from "react";


interface LocalePickerOptionSelectedProps {
	children: boolean;
}

const LocalePickerOptionSelected: FC<LocalePickerOptionSelectedProps> = ({
	children,
}) => {
	return (
		<span className="ml-auto w-3 text-center font-semibold text-primary">
			{children ? '✓' : ''}
		</span>
	);
}

export { LocalePickerOptionSelected };
