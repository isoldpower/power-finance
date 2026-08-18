import { FinanceInput } from "@internal/ui-library";
import { GoalForm } from "@entity/wallets";
import { FieldLabel } from "@shared/forms";

import type { FC, HTMLInputTypeAttribute } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";


interface GoalTextFieldProps {
	id: string;
	label: string;
	registration: UseFormRegisterReturn;
	placeholder?: string;
	type?: HTMLInputTypeAttribute;
	error?: string;
}

const GoalTextField: FC<GoalTextFieldProps> = ({
	id,
	label,
	registration,
	placeholder,
	type,
	error,
}) => (
	<>
		<FieldLabel htmlFor={id}>
			{label}
		</FieldLabel>
		<FinanceInput id={id} type={type} placeholder={placeholder} {...registration} />
		{error ? (
			<GoalForm.FieldError>
				{error}
			</GoalForm.FieldError>
		) : null}
	</>
);

GoalTextField.displayName = 'GoalTextField';

export { GoalTextField };
export type { GoalTextFieldProps };
