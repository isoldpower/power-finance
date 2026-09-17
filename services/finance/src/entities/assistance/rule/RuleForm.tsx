import { cn } from "@internal/ui-library";
import { RuleConditionRow } from "./form/RuleConditionRow.tsx";
import { RuleFormFieldError } from "./form/RuleFormFieldError.tsx";
import { RuleFormSection } from "./form/RuleFormSection.tsx";
import { RuleValueCombobox } from "./form/RuleValueCombobox.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { RuleConditionRowProps } from "./form/RuleConditionRow.tsx";
import type { RuleFormFieldErrorProps } from "./form/RuleFormFieldError.tsx";
import type { RuleFormSectionProps } from "./form/RuleFormSection.tsx";
import type { RuleValueComboboxProps } from "./form/RuleValueCombobox.tsx";


type RuleFormProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type RuleFormObject = FC<RuleFormProps> & {
	ConditionRow: FC<RuleConditionRowProps>;
	FieldError: FC<RuleFormFieldErrorProps>;
	Section: FC<RuleFormSectionProps>;
	ValueCombobox: FC<RuleValueComboboxProps>;
}

const RuleForm: RuleFormObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex-1 overflow-auto p-5"
		)}
		{...props}
	>
		{children}
	</div>
);

RuleForm.ConditionRow = RuleConditionRow;
RuleForm.FieldError = RuleFormFieldError;
RuleForm.Section = RuleFormSection;
RuleForm.ValueCombobox = RuleValueCombobox;
RuleForm.displayName = 'RuleForm';

export { RuleForm };
export type { RuleFormProps };
