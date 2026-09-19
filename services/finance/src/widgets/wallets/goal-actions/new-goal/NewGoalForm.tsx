import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { GoalForm } from "@entity/wallets";
import { useCurrencies } from "@feature/localization";
import { GoalFormOnSubmit, goalFormSchema, useGoalFormInitials, useGoalFormState } from "@feature/wallets";
import { PanelFooter } from "@shared/forms";
import { currencySymbol } from "@shared/formatting";
import { GoalCurrencyField } from "../goal-fields/GoalCurrencyField.tsx";
import { GoalTargetField } from "../goal-fields/GoalTargetField.tsx";
import { GoalTextField } from "../goal-fields/GoalTextField.tsx";
import { NEW_GOAL_LABELS } from "../config.ts";

import type { FC } from "react";
import type { GoalFormSchema } from "@feature/wallets";


interface NewGoalFormProps {
	onClose: () => void;
}

const NewGoalForm: FC<NewGoalFormProps> = ({ onClose }) => {
	const defaultValues = useGoalFormInitials();
	const { register, control, handleSubmit, formState: { errors } } = useForm<GoalFormSchema>({
		resolver: zodResolver(goalFormSchema),
		defaultValues,
	});
	const { loading, methods } = useGoalFormState();
	const { currencies } = useCurrencies();
	const currency = useWatch({ control, name: 'currency' });
	const symbol = currencySymbol(currency);

	return (
		<GoalFormOnSubmit
			className="flex flex-1 flex-col overflow-hidden"
			handleSubmit={handleSubmit}
			onBeforeSubmit={methods.handleLoading}
			onSuccess={() => { methods.handleDoneLoading(); onClose(); }}
			onError={methods.handleFailedLoading}
		>
			<GoalForm>
				<GoalForm.Intro>
					{NEW_GOAL_LABELS.intro}
				</GoalForm.Intro>
				<GoalForm.Field>
					<GoalTextField
						id="goal-name"
						label="Name"
						placeholder="Emergency fund"
						registration={register('name')}
						error={errors.name?.message}
					/>
				</GoalForm.Field>
				<GoalForm.Field>
					<GoalCurrencyField
						id="goal-currency"
						label="Currency"
						control={control}
						currencies={currencies}
						error={errors.currency?.message}
					/>
				</GoalForm.Field>
				<GoalForm.AmountsGrid>
					<div>
						<GoalTargetField
							id="goal-target"
							label="Target"
							control={control}
							symbol={symbol}
							placeholder={`${symbol}15,000`}
							error={errors.target?.message}
						/>
					</div>
					<div>
						<GoalTextField
							id="goal-finish-at"
							label="Target date"
							type="date"
							registration={register('finishAt')}
							error={errors.finishAt?.message}
						/>
					</div>
				</GoalForm.AmountsGrid>
			</GoalForm>
			<PanelFooter
				submitType="submit"
				submitLabel={loading 
					? NEW_GOAL_LABELS.pending 
					: NEW_GOAL_LABELS.submit}
				onClose={onClose}
				submitDisabled={loading}
			/>
		</GoalFormOnSubmit>
	);
};

NewGoalForm.displayName = 'NewGoalForm';

export { NewGoalForm };
export type { NewGoalFormProps };
