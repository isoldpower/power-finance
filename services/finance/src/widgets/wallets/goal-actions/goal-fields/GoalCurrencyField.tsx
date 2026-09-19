import { Controller } from "react-hook-form";
import { CurrencyPicker } from "@widget/localization";
import { GoalForm } from "@entity/wallets";
import { FieldLabel } from "@shared/forms";

import type { FC } from "react";
import type { Control } from "react-hook-form";
import type { CurrencyMeta } from "@entity/localization";
import type { GoalFormSchema } from "@feature/wallets";


interface GoalCurrencyFieldProps {
	id: string;
	label: string;
	control: Control<GoalFormSchema>;
	currencies: CurrencyMeta[];
	error?: string;
}

const GoalCurrencyField: FC<GoalCurrencyFieldProps> = ({
	id,
	label,
	control,
	currencies,
	error,
}) => (
	<>
		<FieldLabel htmlFor={id}>
			{label}
		</FieldLabel>
		<Controller
			control={control}
			name="currency"
			render={({ field }) => (
				<CurrencyPicker
					currencies={currencies}
					value={field.value}
					onSelected={field.onChange}
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

GoalCurrencyField.displayName = 'GoalCurrencyField';

export { GoalCurrencyField };
export type { GoalCurrencyFieldProps };
