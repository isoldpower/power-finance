import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { GoalForm } from "@entity/wallets";
import {
	GOAL_FORM_DEFAULTS,
	GoalFormOnSubmit,
	goalFormSchema,
	useGoalFormState,
} from "@feature/wallets";
import { useConvertMoney } from "@feature/localization";
import { SlideOverPanel } from "@shared/overlays";
import { PanelFooter } from "@shared/forms";
import { currencySymbol } from "@shared/formatting";
import { GoalTargetField } from "./goal-fields/GoalTargetField.tsx";
import { GoalTextField } from "./goal-fields/GoalTextField.tsx";

import type { FC, ReactNode } from "react";
import type { GoalFormSchema } from "@feature/wallets";


interface NewGoalPanelProps {
	children: ReactNode;
}

const NewGoalPanel: FC<NewGoalPanelProps> = ({ children }) => {
	const { register, control, handleSubmit, reset, formState: { errors } } = useForm<GoalFormSchema>({
		resolver: zodResolver(goalFormSchema),
		defaultValues: GOAL_FORM_DEFAULTS,
	});
	const { loading, methods } = useGoalFormState();
	const { targetCurrency } = useConvertMoney();
	const symbol = currencySymbol(targetCurrency);

	const resetForm = useCallback(() => {
		reset(GOAL_FORM_DEFAULTS);
	}, [reset]);

	return (
		<SlideOverPanel trigger={children} title="New goal" onClose={resetForm}>
			{({ close }) => (
				<GoalFormOnSubmit
					className="flex flex-1 flex-col overflow-hidden"
					handleSubmit={handleSubmit}
					onBeforeSubmit={methods.handleLoading}
					onSuccess={() => { methods.handleDoneLoading(); close(); }}
					onError={methods.handleFailedLoading}
				>
					<GoalForm>
						<GoalForm.Intro>
							Set a target and a date to track your progress.
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
						submitLabel={loading ? 'Creating…' : 'Create goal'}
						onClose={close}
						submitDisabled={loading}
					/>
				</GoalFormOnSubmit>
			)}
		</SlideOverPanel>
	);
};

NewGoalPanel.displayName = 'NewGoalPanel';

export { NewGoalPanel };
export type { NewGoalPanelProps };
