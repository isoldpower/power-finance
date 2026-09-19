import { cn } from "@internal/ui-library";
import { RuleConditionRow } from "./form/RuleConditionRow.tsx";
import { RuleFormFieldError } from "./form/RuleFormFieldError.tsx";
import { RuleFormSection } from "./form/RuleFormSection.tsx";
import { RuleValueCombobox } from "./form/RuleValueCombobox.tsx";
import { RuleValueContent } from "./form/RuleValueContent.tsx";
import { RuleValueEmpty } from "./form/RuleValueEmpty.tsx";
import { RuleValueList } from "./form/RuleValueList.tsx";
import { RuleValueOption } from "./form/RuleValueOption.tsx";
import { RuleValueSearch } from "./form/RuleValueSearch.tsx";
import { RuleValueTrigger } from "./form/RuleValueTrigger.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { RuleConditionRowProps } from "./form/RuleConditionRow.tsx";
import type { RuleFormFieldErrorProps } from "./form/RuleFormFieldError.tsx";
import type { RuleFormSectionProps } from "./form/RuleFormSection.tsx";
import type { RuleValueComboboxProps } from "./form/RuleValueCombobox.tsx";
import type { RuleValueContentProps } from "./form/RuleValueContent.tsx";
import type { RuleValueEmptyProps } from "./form/RuleValueEmpty.tsx";
import type { RuleValueListProps } from "./form/RuleValueList.tsx";
import type { RuleValueOptionProps } from "./form/RuleValueOption.tsx";
import type { RuleValueSearchProps } from "./form/RuleValueSearch.tsx";
import type { RuleValueTriggerProps } from "./form/RuleValueTrigger.tsx";


type RuleFormProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type RuleFormObject = FC<RuleFormProps> & {
	ConditionRow: FC<RuleConditionRowProps>;
	FieldError: FC<RuleFormFieldErrorProps>;
	Section: FC<RuleFormSectionProps>;
	ValueCombobox: FC<RuleValueComboboxProps>;
	ValueContent: FC<RuleValueContentProps>;
	ValueEmpty: FC<RuleValueEmptyProps>;
	ValueList: FC<RuleValueListProps>;
	ValueOption: FC<RuleValueOptionProps>;
	ValueSearch: FC<RuleValueSearchProps>;
	ValueTrigger: FC<RuleValueTriggerProps>;
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
RuleForm.ValueContent = RuleValueContent;
RuleForm.ValueEmpty = RuleValueEmpty;
RuleForm.ValueList = RuleValueList;
RuleForm.ValueOption = RuleValueOption;
RuleForm.ValueSearch = RuleValueSearch;
RuleForm.ValueTrigger = RuleValueTrigger;
RuleForm.displayName = 'RuleForm';

export { RuleForm };
export type { RuleFormProps };
