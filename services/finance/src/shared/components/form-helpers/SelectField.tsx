import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@internal/ui-library";
import type { ComponentProps, FC } from "react";


interface SelectFieldProps extends Omit<ComponentProps<typeof Select>, 'onValueChange'> {
	options: { label: string; value: string }[];
	excluded?: string[];
	onChange: (value: string) => void;
	placeholder?: string;
	className?: string;
}

const SelectField: FC<SelectFieldProps> = ({
	options,
	excluded,
	placeholder = 'Select an option',
	...props
}) => {
	return (
		<Select onValueChange={props.onChange} {...props}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{options
					.filter((option) => !(excluded ?? []).includes(option.value))
					.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

SelectField.displayName = 'SelectField';

export { SelectField };
export type { SelectFieldProps };