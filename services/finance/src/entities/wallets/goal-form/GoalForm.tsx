import { cn } from "@internal/ui-library";
import { GoalFormAmountsGrid } from "./form/GoalFormAmountsGrid.tsx";
import { GoalFormField } from "./form/GoalFormField.tsx";
import { GoalFormFieldError } from "./form/GoalFormFieldError.tsx";
import { GoalFormIntro } from "./form/GoalFormIntro.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { GoalFormAmountsGridProps } from "./form/GoalFormAmountsGrid.tsx";
import type { GoalFormFieldProps } from "./form/GoalFormField.tsx";
import type { GoalFormFieldErrorProps } from "./form/GoalFormFieldError.tsx";
import type { GoalFormIntroProps } from "./form/GoalFormIntro.tsx";


type GoalFormProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type GoalFormObject = FC<GoalFormProps> & {
	AmountsGrid: FC<GoalFormAmountsGridProps>;
	Field: FC<GoalFormFieldProps>;
	FieldError: FC<GoalFormFieldErrorProps>;
	Intro: FC<GoalFormIntroProps>;
}

const GoalForm: GoalFormObject = ({
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

GoalForm.AmountsGrid = GoalFormAmountsGrid;
GoalForm.Field = GoalFormField;
GoalForm.FieldError = GoalFormFieldError;
GoalForm.Intro = GoalFormIntro;
GoalForm.displayName = 'GoalForm';

export { GoalForm };
export type { GoalFormProps };
