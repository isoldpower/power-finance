import { FinanceCombobox } from "@internal/ui-library";
import { TimezonePickerContent } from "./picker/TimezonePickerContent.tsx";
import { TimezonePickerEmpty } from "./picker/TimezonePickerEmpty.tsx";
import { TimezonePickerLabel } from "./picker/TimezonePickerLabel.tsx";
import { TimezonePickerList } from "./picker/TimezonePickerList.tsx";
import { TimezonePickerOffset } from "./picker/TimezonePickerOffset.tsx";
import { TimezonePickerOption } from "./picker/TimezonePickerOption.tsx";
import { TimezonePickerOptionArea } from "./picker/TimezonePickerOptionArea.tsx";
import { TimezonePickerOptionCity } from "./picker/TimezonePickerOptionCity.tsx";
import { TimezonePickerOptionSelected } from "./picker/TimezonePickerOptionSelected.tsx";
import { TimezonePickerSearch } from "./picker/TimezonePickerSearch.tsx";
import { TimezonePickerTrigger } from "./picker/TimezonePickerTrigger.tsx";

import type { FC, PropsWithChildren } from "react";
import type { TimezonePickerContentProps } from "./picker/TimezonePickerContent.tsx";
import type { TimezonePickerEmptyProps } from "./picker/TimezonePickerEmpty.tsx";
import type { TimezonePickerLabelProps } from "./picker/TimezonePickerLabel.tsx";
import type { TimezonePickerListProps } from "./picker/TimezonePickerList.tsx";
import type { TimezonePickerOffsetProps } from "./picker/TimezonePickerOffset.tsx";
import type { TimezonePickerOptionProps } from "./picker/TimezonePickerOption.tsx";
import type { TimezonePickerOptionAreaProps } from "./picker/TimezonePickerOptionArea.tsx";
import type { TimezonePickerOptionCityProps } from "./picker/TimezonePickerOptionCity.tsx";
import type { TimezonePickerOptionSelectedProps } from "./picker/TimezonePickerOptionSelected.tsx";
import type { TimezonePickerSearchProps } from "./picker/TimezonePickerSearch.tsx";
import type { TimezonePickerTriggerProps } from "./picker/TimezonePickerTrigger.tsx";


type TimezoneComboboxProps = PropsWithChildren;
type TimezoneComboboxObject = FC<TimezoneComboboxProps> & {
	Content: FC<TimezonePickerContentProps>;
	Empty: FC<TimezonePickerEmptyProps>;
	Label: FC<TimezonePickerLabelProps>;
	List: FC<TimezonePickerListProps>;
	Offset: FC<TimezonePickerOffsetProps>;
	Option: FC<TimezonePickerOptionProps>;
	OptionArea: FC<TimezonePickerOptionAreaProps>;
	OptionCity: FC<TimezonePickerOptionCityProps>;
	OptionSelected: FC<TimezonePickerOptionSelectedProps>;
	Search: FC<TimezonePickerSearchProps>;
	Trigger: FC<TimezonePickerTriggerProps>;
};

const TimezoneCombobox: TimezoneComboboxObject = ({ children }) => (
	<FinanceCombobox>
		{children}
	</FinanceCombobox>
);

TimezoneCombobox.Content = TimezonePickerContent;
TimezoneCombobox.Empty = TimezonePickerEmpty;
TimezoneCombobox.Label = TimezonePickerLabel;
TimezoneCombobox.List = TimezonePickerList;
TimezoneCombobox.Offset = TimezonePickerOffset;
TimezoneCombobox.Option = TimezonePickerOption;
TimezoneCombobox.OptionArea = TimezonePickerOptionArea;
TimezoneCombobox.OptionCity = TimezonePickerOptionCity;
TimezoneCombobox.OptionSelected = TimezonePickerOptionSelected;
TimezoneCombobox.Search = TimezonePickerSearch;
TimezoneCombobox.Trigger = TimezonePickerTrigger;
TimezoneCombobox.displayName = 'TimezoneCombobox';

export { TimezoneCombobox };
export type { TimezoneComboboxProps };
