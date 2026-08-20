import { cn, UiSelect, UiSelectContent, UiSelectItem, UiSelectTrigger, UiSelectValue } from "@internal/ui-library";
import { useCallback, type ComponentProps, type ReactNode } from "react";


interface SelectGraphTypeProps<T extends string, V extends string> extends Omit<ComponentProps<typeof UiSelectTrigger>, 'onChange'> {
	graphType: T;
	onChange: (graphType: T) => void;
	options: Record<T, V>;
}

function SelectGraphType<T extends string, V extends string>({ 
	graphType,
	onChange,
	options,
	className,
	...props
}: SelectGraphTypeProps<T, V>) {
	const handleValueChange = useCallback((value: string) => {
		onChange(value as keyof typeof options);
	}, [onChange]);

	return (
		<UiSelect value={graphType} onValueChange={handleValueChange}>
			<UiSelectTrigger className={cn("w-full", className)} {...props}>
				<UiSelectValue />
			</UiSelectTrigger>
			<UiSelectContent>
				{Object.entries(options).map(([key, value]) => (
					<UiSelectItem key={key} value={key}>
						{value as ReactNode}
					</UiSelectItem>
				))}
			</UiSelectContent>
		</UiSelect>
	)
}

export { SelectGraphType };
export type { SelectGraphTypeProps };