import { FinanceComboboxList } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type TimezonePickerListProps = PropsWithChildren;

const TimezonePickerList: FC<TimezonePickerListProps> = ({ children }) => (
	<FinanceComboboxList>
		{children}
	</FinanceComboboxList>
);

TimezonePickerList.displayName = 'TimezonePickerList';

export { TimezonePickerList };
export type { TimezonePickerListProps };
