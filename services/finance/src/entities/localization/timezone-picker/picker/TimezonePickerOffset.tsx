import { MetaText } from "@shared/pure-components/typography";

import type { FC } from "react";


interface TimezonePickerOffsetProps {
	children?: string;
}

const TimezonePickerOffset: FC<TimezonePickerOffsetProps> = ({ children }) => (
	<MetaText size="10.5" className="ml-auto tabular-nums">
		{children}
	</MetaText>
);

TimezonePickerOffset.displayName = 'TimezonePickerOffset';

export { TimezonePickerOffset };
export type { TimezonePickerOffsetProps };
