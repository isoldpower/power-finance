import { Controller } from "react-hook-form";
import { FinanceInput } from "@internal/ui-library";
import { GoalForm } from "@entity/wallets";
import { FieldLabel } from "@shared/forms";
import { formatAmountInput } from "@shared/formatting";

import type { FC } from "react";
import type { Control } from "react-hook-form";
import type { GoalFormSchema } from "@feature/wallets";


interface GoalTargetFieldProps {
	id: string;
	label: string;
	control: Control<GoalFormSchema>;
	symbol: string;
	placeholder: string;
	error?: string;
}

const GoalTargetField: FC<GoalTargetFieldProps> = ({
	id,
	label,
	control,
	symbol,
	placeholder,
	error,
}) => (
	<>
		<FieldLabel htmlFor={id}>
			{label}
		</FieldLabel>
		<Controller
			control={control}
			name="target"
			render={({ field }) => (
				<FinanceInput
					id={id}
					inputMode="decimal"
					placeholder={placeholder}
					value={field.value}
					onChange={(event) => {
						field.onChange(formatAmountInput(event.target.value, symbol));
					}}
				/>
			)}
		/>
		{error ? (
			<GoalForm.FieldError>
				{error}
			</GoalForm.FieldError>
		) : null}
	</>
);

GoalTargetField.displayName = 'GoalTargetField';

export { GoalTargetField };
export type { GoalTargetFieldProps };
