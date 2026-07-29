import type { FC, ReactNode } from "react";


interface LocalePickerOptionRegionProps {
	children: ReactNode;
}

const LocalePickerOptionRegion: FC<LocalePickerOptionRegionProps> = ({
	children,
}) => {
	return (
		<span className="font-numeric truncate text-[10.5px] text-text-3">
			{children}
		</span>
	);
}

export { LocalePickerOptionRegion };
