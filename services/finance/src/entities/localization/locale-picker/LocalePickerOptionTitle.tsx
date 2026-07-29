import type { FC, ReactNode } from "react";


interface LocalePickerOptionTitleProps {
	children: ReactNode;
}

const LocalePickerOptionTitle: FC<LocalePickerOptionTitleProps> = ({
	children,
}) => {
	return (
		<span className="truncate font-semibold">
			{children}
		</span>
	);
}

export { LocalePickerOptionTitle };
