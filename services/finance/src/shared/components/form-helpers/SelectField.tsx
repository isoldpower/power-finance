import { Select, FormControl, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@internal/ui-library";
import {ComponentProps, FC} from "react";

interface SelectFieldProps extends Omit<ComponentProps<typeof Select>, 'onValueChange'> {
	options: Array<{ label: string; value: string }>;
	excluded?: string[];
	onChange: (value: string) => void;
}

const SelectField: FC<SelectFieldProps> = ({
	options,
	excluded = [],
	...props
}) => {
	return (
		<Select onValueChange={props.onChange} {...props}>
			<FormControl>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Select account" />
				</SelectTrigger>
			</FormControl>
			<SelectContent>
				{options
					.filter((option) => !excluded.includes(option.value))
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