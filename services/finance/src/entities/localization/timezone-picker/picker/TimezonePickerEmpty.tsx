import { FinanceComboboxEmpty } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type TimezonePickerEmptyProps = PropsWithChildren;

const TimezonePickerEmpty: FC<TimezonePickerEmptyProps> = ({ children }) => (
	<FinanceComboboxEmpty>
		{children}
	</FinanceComboboxEmpty>
);

TimezonePickerEmpty.displayName = 'TimezonePickerEmpty';

export { TimezonePickerEmpty };
export type { TimezonePickerEmptyProps };
