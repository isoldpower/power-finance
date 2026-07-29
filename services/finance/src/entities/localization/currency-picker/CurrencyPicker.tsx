import {CurrencyPickerLabel} from "./CurrencyPickerLabel.tsx";
import {CurrencyPickerOptionSymbol} from "./CurrencyPickerOptionSymbol.tsx";
import {CurrencyPickerOptionCode} from "./CurrencyPickerOptionCode.tsx";
import {CurrencyPickerOptionTitle} from "./CurrencyPickerOptionTitle.tsx";
import {CurrencyPickerOptionSelected} from "./CurrencyPickerOptionSelected.tsx";


function CurrencyPicker() {
	return null;
}

CurrencyPicker.displayName = 'CurrencyPicker';
CurrencyPicker.Label = CurrencyPickerLabel;
CurrencyPicker.OptionSymbol = CurrencyPickerOptionSymbol;
CurrencyPicker.OptionCode = CurrencyPickerOptionCode;
CurrencyPicker.OptionTitle = CurrencyPickerOptionTitle;
CurrencyPicker.OptionSelected = CurrencyPickerOptionSelected;

export { CurrencyPicker };
