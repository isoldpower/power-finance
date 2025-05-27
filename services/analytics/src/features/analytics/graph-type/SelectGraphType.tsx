import { cn, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@internal/ui-library";
import { useCallback, type ComponentProps, type ReactNode } from "react";


interface SelectGraphTypeProps<T extends string, V extends string> extends Omit<ComponentProps<typeof SelectTrigger>, 'onChange'> {
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
		<Select value={graphType} onValueChange={handleValueChange}>
			<SelectTrigger className={cn("w-full", className)} {...props}>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{Object.entries(options).map(([key, value]) => (
					<SelectItem key={key} value={key}>
						{value as ReactNode}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}

export { SelectGraphType };
export type { SelectGraphTypeProps };