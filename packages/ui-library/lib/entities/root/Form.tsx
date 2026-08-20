import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
	useFormField,
} from "@/entities/shadcn";
import { forwardUi } from "./forward-ui.tsx";

export const UiFormItem = forwardUi(FormItem, "UiFormItem");
export const UiFormLabel = forwardUi(FormLabel, "UiFormLabel");
export const UiFormControl = forwardUi(FormControl, "UiFormControl");
export const UiFormDescription = forwardUi(FormDescription, "UiFormDescription");
export const UiFormMessage = forwardUi(FormMessage, "UiFormMessage");

export { Form as UiForm, FormField as UiFormField, useFormField as useUiFormField };
