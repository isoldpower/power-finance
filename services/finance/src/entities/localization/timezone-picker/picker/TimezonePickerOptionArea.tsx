import { MetaText } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type TimezonePickerOptionAreaProps = PropsWithChildren;

const TimezonePickerOptionArea: FC<TimezonePickerOptionAreaProps> = ({ children }) => (
	<MetaText size="10.5" truncate>
		{children}
	</MetaText>
);

TimezonePickerOptionArea.displayName = 'TimezonePickerOptionArea';

export { TimezonePickerOptionArea };
export type { TimezonePickerOptionAreaProps };
