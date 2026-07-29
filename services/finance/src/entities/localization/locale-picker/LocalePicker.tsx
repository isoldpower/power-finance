import {LocalePickerLabel} from "./LocalePickerLabel.tsx";
import {LocalePickerOptionTitle} from "./LocalePickerOptionTitle.tsx";
import {LocalePickerOptionRegion} from "./LocalePickerOptionRegion.tsx";
import {LocalePickerOptionSelected} from "./LocalePickerOptionSelected.tsx";


function LocalePicker() {
	return null;
}

LocalePicker.displayName = 'LocalePicker';
LocalePicker.Label = LocalePickerLabel;
LocalePicker.OptionTitle = LocalePickerOptionTitle;
LocalePicker.OptionRegion = LocalePickerOptionRegion;
LocalePicker.OptionSelected = LocalePickerOptionSelected;

export { LocalePicker };
