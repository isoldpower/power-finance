import { Text } from "@internal/shared";

import type { FC, PropsWithChildren } from "react";


type TimezonePickerOptionCityProps = PropsWithChildren;

const TimezonePickerOptionCity: FC<TimezonePickerOptionCityProps> = ({ children }) => (
	<Text weight="semibold" truncate>
		{children}
	</Text>
);

TimezonePickerOptionCity.displayName = 'TimezonePickerOptionCity';

export { TimezonePickerOptionCity };
export type { TimezonePickerOptionCityProps };
