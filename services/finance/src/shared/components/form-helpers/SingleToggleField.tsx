import { cn, ToggleGroup, ToggleGroupItem } from "@internal/ui-library";
import {ComponentProps, FC, ReactNode, useCallback} from "react";

type SingleToggleFieldProps = Omit<ComponentProps<typeof ToggleGroup>, 'type'> & {
	options: Array<{ label: ReactNode; value: string }>;
}

const SingleToggleField: FC<SingleToggleFieldProps> = ({ options, className, ...props }) => {
	const handleValueChange = useCallback((value: string) => {
		if (!value) return;

		props.onChange?.(value);
	}, [props.onChange]);

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
					aria-label={`Toggle ${option.label}`}
				>
					{option.label}
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
};

export { SingleToggleField };
export type { SingleToggleFieldProps };