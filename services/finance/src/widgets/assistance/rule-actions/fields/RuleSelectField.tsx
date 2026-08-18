import {
	cn,
	FinanceSelect,
	FinanceSelectContent,
	FinanceSelectItem,
	FinanceSelectTrigger,
	FinanceSelectValue,
} from "@internal/ui-library";
import { RULE_FIELD_TEXT } from "./config.ts";

import type { FC } from "react";
import type { SelectOption } from "@shared/forms";


interface RuleSelectFieldProps {
	value: string;
	options: SelectOption[];
	className?: string;
	ariaLabel: string;
	placeholder?: string;
	disabled?: boolean;
	onChange: (value: string) => void;
}

const RuleSelectField: FC<RuleSelectFieldProps> = ({
	value,
	options,
	className,
	ariaLabel,
	placeholder,
	disabled,
	onChange,
}) => (
	<FinanceSelect value={value} disabled={disabled} onValueChange={onChange}>
		<FinanceSelectTrigger
			className={cn("h-10 w-full px-3.5 font-normal", RULE_FIELD_TEXT, className)}
			aria-label={ariaLabel}
		>
			<FinanceSelectValue placeholder={placeholder} />
		</FinanceSelectTrigger>
		<FinanceSelectContent>
			{options.map((option) => (
				<FinanceSelectItem
					key={option.value}
					value={option.value}
					className={cn(RULE_FIELD_TEXT, "font-normal data-[state=checked]:font-normal")}
				>
					{option.label}
				</FinanceSelectItem>
			))}
		</FinanceSelectContent>
	</FinanceSelect>
);

RuleSelectField.displayName = 'RuleSelectField';

export { RuleSelectField };
export type { RuleSelectFieldProps };
