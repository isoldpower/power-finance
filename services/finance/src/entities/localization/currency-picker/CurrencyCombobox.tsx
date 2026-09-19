import { FinanceCombobox } from "@internal/ui-library";
import { CurrencyPickerContent } from "./picker/CurrencyPickerContent.tsx";
import { CurrencyPickerEmpty } from "./picker/CurrencyPickerEmpty.tsx";
import { CurrencyPickerLabel } from "./picker/CurrencyPickerLabel.tsx";
import { CurrencyPickerList } from "./picker/CurrencyPickerList.tsx";
import { CurrencyPickerOption } from "./picker/CurrencyPickerOption.tsx";
import { CurrencyPickerOptionCode } from "./picker/CurrencyPickerOptionCode.tsx";
import { CurrencyPickerOptionName } from "./picker/CurrencyPickerOptionName.tsx";
import { CurrencyPickerOptionSelected } from "./picker/CurrencyPickerOptionSelected.tsx";
import { CurrencyPickerOptionSymbol } from "./picker/CurrencyPickerOptionSymbol.tsx";
import { CurrencyPickerSearch } from "./picker/CurrencyPickerSearch.tsx";
import { CurrencyPickerTrigger } from "./picker/CurrencyPickerTrigger.tsx";

import type { FC, PropsWithChildren } from "react";
import type { CurrencyPickerContentProps } from "./picker/CurrencyPickerContent.tsx";
import type { CurrencyPickerEmptyProps } from "./picker/CurrencyPickerEmpty.tsx";
import type { CurrencyPickerLabelProps } from "./picker/CurrencyPickerLabel.tsx";
import type { CurrencyPickerListProps } from "./picker/CurrencyPickerList.tsx";
import type { CurrencyPickerOptionProps } from "./picker/CurrencyPickerOption.tsx";
import type { CurrencyPickerOptionCodeProps } from "./picker/CurrencyPickerOptionCode.tsx";
import type { CurrencyPickerOptionNameProps } from "./picker/CurrencyPickerOptionName.tsx";
import type { CurrencyPickerOptionSelectedProps } from "./picker/CurrencyPickerOptionSelected.tsx";
import type { CurrencyPickerOptionSymbolProps } from "./picker/CurrencyPickerOptionSymbol.tsx";
import type { CurrencyPickerSearchProps } from "./picker/CurrencyPickerSearch.tsx";
import type { CurrencyPickerTriggerProps } from "./picker/CurrencyPickerTrigger.tsx";


type CurrencyComboboxProps = PropsWithChildren;
type CurrencyComboboxObject = FC<CurrencyComboboxProps> & {
	Content: FC<CurrencyPickerContentProps>;
	Empty: FC<CurrencyPickerEmptyProps>;
	Label: FC<CurrencyPickerLabelProps>;
	List: FC<CurrencyPickerListProps>;
	Option: FC<CurrencyPickerOptionProps>;
	OptionCode: FC<CurrencyPickerOptionCodeProps>;
	OptionName: FC<CurrencyPickerOptionNameProps>;
	OptionSelected: FC<CurrencyPickerOptionSelectedProps>;
	OptionSymbol: FC<CurrencyPickerOptionSymbolProps>;
	Search: FC<CurrencyPickerSearchProps>;
	Trigger: FC<CurrencyPickerTriggerProps>;
};

const CurrencyCombobox: CurrencyComboboxObject = ({ children }) => (
	<FinanceCombobox>
		{children}
	</FinanceCombobox>
);

CurrencyCombobox.Content = CurrencyPickerContent;
CurrencyCombobox.Empty = CurrencyPickerEmpty;
CurrencyCombobox.Label = CurrencyPickerLabel;
CurrencyCombobox.List = CurrencyPickerList;
CurrencyCombobox.Option = CurrencyPickerOption;
CurrencyCombobox.OptionCode = CurrencyPickerOptionCode;
CurrencyCombobox.OptionName = CurrencyPickerOptionName;
CurrencyCombobox.OptionSelected = CurrencyPickerOptionSelected;
CurrencyCombobox.OptionSymbol = CurrencyPickerOptionSymbol;
CurrencyCombobox.Search = CurrencyPickerSearch;
CurrencyCombobox.Trigger = CurrencyPickerTrigger;
CurrencyCombobox.displayName = 'CurrencyCombobox';

export { CurrencyCombobox };
export type { CurrencyComboboxProps };
