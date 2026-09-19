import type { FC, PropsWithChildren } from "react";


type TimezonePickerLabelProps = PropsWithChildren;

const TimezonePickerLabel: FC<TimezonePickerLabelProps> = ({ children }) => (
	<span className="truncate">
		{children}
	</span>
);

TimezonePickerLabel.displayName = 'TimezonePickerLabel';

export { TimezonePickerLabel };
export type { TimezonePickerLabelProps };
