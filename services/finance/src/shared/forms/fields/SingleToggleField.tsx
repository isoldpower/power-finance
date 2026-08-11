import { cn, UiToggleGroup, UiToggleGroupItem } from "@internal/ui-library";
import { useCallback } from "react";
import type { ComponentProps, FC, FormEvent, FormEventHandler, ReactNode } from "react";


type SingleToggleFieldProps = Omit<
	ComponentProps<typeof UiToggleGroup>,
	'type' | 'className' | 'value' | 'defaultValue' | 'onValueChange'
> & {
	options: { label: ReactNode; value: string }[];
	value?: string;
	defaultValue?: string;
	className?: string
}

const SingleToggleField: FC<SingleToggleFieldProps> = ({ options, className, onChange, ...props }) => {
	const handleValueChange = useCallback((value: string) => {
		if (!value) return;

		if (onChange) {
			(onChange as FormEventHandler)(value as unknown as FormEvent);
		}
	}, [onChange]);

	return (
		<UiToggleGroup
			type="single"
			className={cn("w-full border", className)}
			onValueChange={handleValueChange}
			{...props}
		>
			{options.map((option) => (
				<UiToggleGroupItem
					key={option.value}
					value={option.value}
					aria-label={`UiToggle ${option.value}`}
				>
					{option.label}
				</UiToggleGroupItem>
			))}
		</UiToggleGroup>
	);
};

export { SingleToggleField };
export type { SingleToggleFieldProps };