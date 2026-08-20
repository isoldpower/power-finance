import { FinanceMenu } from "@internal/ui-library";
import { WalletSelectCaret } from "./wallet-select/WalletSelectCaret.tsx";
import { WalletSelectCurrency } from "./wallet-select/WalletSelectCurrency.tsx";
import { WalletSelectEmpty } from "./wallet-select/WalletSelectEmpty.tsx";
import { WalletSelectOption } from "./wallet-select/WalletSelectOption.tsx";
import { WalletSelectOptionName } from "./wallet-select/WalletSelectOptionName.tsx";
import { WalletSelectOptions } from "./wallet-select/WalletSelectOptions.tsx";
import { WalletSelectSelected } from "./wallet-select/WalletSelectSelected.tsx";
import { WalletSelectSwatch } from "./wallet-select/WalletSelectSwatch.tsx";
import { WalletSelectTrigger } from "./wallet-select/WalletSelectTrigger.tsx";
import { WalletSelectValue } from "./wallet-select/WalletSelectValue.tsx";

import type { FC, PropsWithChildren } from "react";
import type { WalletSelectCurrencyProps } from "./wallet-select/WalletSelectCurrency.tsx";
import type { WalletSelectEmptyProps } from "./wallet-select/WalletSelectEmpty.tsx";
import type { WalletSelectOptionProps } from "./wallet-select/WalletSelectOption.tsx";
import type { WalletSelectOptionNameProps } from "./wallet-select/WalletSelectOptionName.tsx";
import type { WalletSelectOptionsProps } from "./wallet-select/WalletSelectOptions.tsx";
import type { WalletSelectSwatchProps } from "./wallet-select/WalletSelectSwatch.tsx";
import type { WalletSelectTriggerProps } from "./wallet-select/WalletSelectTrigger.tsx";
import type { WalletSelectValueProps } from "./wallet-select/WalletSelectValue.tsx";


interface WalletSelectItem {
	id: string;
	name: string;
	currency: string;
	gradient: string;
}

type WalletSelectProps = PropsWithChildren;
type WalletSelectObject = FC<WalletSelectProps> & {
	Caret: FC;
	Currency: FC<WalletSelectCurrencyProps>;
	Empty: FC<WalletSelectEmptyProps>;
	Option: FC<WalletSelectOptionProps>;
	OptionName: FC<WalletSelectOptionNameProps>;
	Options: FC<WalletSelectOptionsProps>;
	Selected: FC;
	Swatch: FC<WalletSelectSwatchProps>;
	Trigger: FC<WalletSelectTriggerProps>;
	Value: FC<WalletSelectValueProps>;
}

const WalletSelect: WalletSelectObject = ({ children }) => (
	<FinanceMenu>
		{children}
	</FinanceMenu>
);

WalletSelect.Caret = WalletSelectCaret;
WalletSelect.Currency = WalletSelectCurrency;
WalletSelect.Empty = WalletSelectEmpty;
WalletSelect.Option = WalletSelectOption;
WalletSelect.OptionName = WalletSelectOptionName;
WalletSelect.Options = WalletSelectOptions;
WalletSelect.Selected = WalletSelectSelected;
WalletSelect.Swatch = WalletSelectSwatch;
WalletSelect.Trigger = WalletSelectTrigger;
WalletSelect.Value = WalletSelectValue;
WalletSelect.displayName = 'WalletSelect';

export { WalletSelect };
export type { WalletSelectProps, WalletSelectItem };
