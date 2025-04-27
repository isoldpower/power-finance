import { Input } from "@internal/ui-library"
import type {ComponentProps, FC} from "react";


interface AmountFieldProps extends ComponentProps<'input'> {
	placeholder?: string;
}

const InputField: FC<AmountFieldProps> = ({ placeholder, ...field }) => {
	return (
		<Input placeholder={placeholder} {...field} />
	)
}

export { InputField };
export type { AmountFieldProps };