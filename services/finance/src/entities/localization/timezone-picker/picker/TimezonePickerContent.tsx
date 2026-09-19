import { FinanceComboboxContent } from "@internal/ui-library";

import type { FinanceComboboxPivot } from "@internal/ui-library";
import type { FC, PropsWithChildren } from "react";


type TimezonePickerContentProps = PropsWithChildren<{
	pivot?: FinanceComboboxPivot;
}>;

const TimezonePickerContent: FC<TimezonePickerContentProps> = ({ pivot, children }) => (
	<FinanceComboboxContent pivot={pivot}>
		{children}
	</FinanceComboboxContent>
);

TimezonePickerContent.displayName = 'TimezonePickerContent';

export { TimezonePickerContent };
export type { TimezonePickerContentProps };
