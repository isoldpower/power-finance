import { cn, ToggleGroup, ToggleGroupItem } from "@internal/ui-library";
import {ComponentProps, FC, ReactNode, useCallback} from "react";

type SingleToggleFieldProps = Omit<ComponentProps<typeof ToggleGroup>, 'type' | 'className'> & {
	options: { label: ReactNode; value: string }[];
	className?: string
}

const SingleToggleField: FC<SingleToggleFieldProps> = ({ options, className, onChange, ...props }) => {
	const handleValueChange = useCallback((value: string) => {
		if (!value) return;

		if (onChange) {
			(onChange as (value: string) => void)(value);
		}
	}, [onChange]);

	return (
		<ToggleGroup
			type="single"
			className={cn("w-full border", className)}
			onValueChange={handleValueChange}
			{...props}
		>
			{options.map((option) => (
				<ToggleGroupItem
					key={option.value}
					value={option.value}
					aria-label={`Toggle ${option.value}`}
				>
					{option.label}
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
};

export { SingleToggleField };
export type { SingleToggleFieldProps };