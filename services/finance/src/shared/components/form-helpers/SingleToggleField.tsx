import { cn, ToggleGroup, ToggleGroupItem } from "@internal/ui-library";
import type { ComponentProps, FC, ReactNode } from "react";
import { TRANSACTION_TYPES } from "@widget/wallet/new-transaction-form/schema.ts";

type SingleToggleFieldProps = Omit<ComponentProps<typeof ToggleGroup>, 'type'> & {
	options: Array<{ label: ReactNode; value: string }>;
}

const SingleToggleField: FC<SingleToggleFieldProps> = ({ options, className, ...props }) => {
	return (
		<ToggleGroup
			type="single"
			className={cn("w-full border", className)}
			onValueChange={props.onChange}
			{...props}
		>
			{TRANSACTION_TYPES.map((option) => (
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