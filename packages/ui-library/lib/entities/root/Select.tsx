import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from "@/entities/shadcn";
import { forwardUi } from "./forward-ui.tsx";

export const UiSelect = forwardUi(Select, "UiSelect");
export const UiSelectContent = forwardUi(SelectContent, "UiSelectContent");
export const UiSelectGroup = forwardUi(SelectGroup, "UiSelectGroup");
export const UiSelectItem = forwardUi(SelectItem, "UiSelectItem");
export const UiSelectLabel = forwardUi(SelectLabel, "UiSelectLabel");
export const UiSelectScrollDownButton = forwardUi(SelectScrollDownButton, "UiSelectScrollDownButton");
export const UiSelectScrollUpButton = forwardUi(SelectScrollUpButton, "UiSelectScrollUpButton");
export const UiSelectSeparator = forwardUi(SelectSeparator, "UiSelectSeparator");
export const UiSelectTrigger = forwardUi(SelectTrigger, "UiSelectTrigger");
export const UiSelectValue = forwardUi(SelectValue, "UiSelectValue");
