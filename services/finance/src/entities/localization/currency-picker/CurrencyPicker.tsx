import {CurrencyPickerLabel} from "./CurrencyPickerLabel.tsx";
import {CurrencyPickerOptionSymbol} from "./CurrencyPickerOptionSymbol.tsx";
import {CurrencyPickerOptionCode} from "./CurrencyPickerOptionCode.tsx";
import {CurrencyPickerOptionSelected} from "./CurrencyPickerOptionSelected.tsx";


function CurrencyPicker() {
	return null;
}

CurrencyPicker.displayName = 'CurrencyPicker';
CurrencyPicker.Label = CurrencyPickerLabel;
CurrencyPicker.OptionSymbol = CurrencyPickerOptionSymbol;
CurrencyPicker.OptionCode = CurrencyPickerOptionCode;
CurrencyPicker.OptionSelected = CurrencyPickerOptionSelected;

export { CurrencyPicker };
