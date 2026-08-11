import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FinanceInput } from "@internal/ui-library";

import { GoalForm } from "@entity/wallets";
import {
	formatCurrencyInput,
	GOAL_FORM_DEFAULTS,
	GoalFormOnSubmit,
	goalFormSchema,
	useGoalFormState,
} from "@feature/wallets";
import { SlideOverPanel } from "@shared/overlays";
import { FieldLabel, PanelFooter } from "@shared/forms";

import { GoalIconPicker } from "./GoalIconPicker.tsx";

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
					<GoalForm.Body>
						<GoalForm.Intro>
							Set a target and a monthly contribution to track your progress.
						</GoalForm.Intro>
						<GoalForm.Field>
							<FieldLabel htmlFor="goal-name">
								Name
							</FieldLabel>
							<GoalForm.NameRow>
								<Controller
									control={control}
									name="icon"
									render={({ field }) => (
										<GoalIconPicker
											value={field.value ?? ''}
											onChange={field.onChange}
										/>
									)}
								/>
								<FinanceInput
									id="goal-name"
									placeholder="Emergency fund"
									className="flex-1"
									{...register('name')}
								/>
							</GoalForm.NameRow>
							{errors.name ? (
								<GoalForm.FieldError>
									{errors.name.message}
								</GoalForm.FieldError>
							) : null}
						</GoalForm.Field>
						<GoalForm.AmountsGrid>
							<div>
								<FieldLabel htmlFor="goal-target">
									Target
								</FieldLabel>
								<Controller
									control={control}
									name="target"
									render={({ field }) => (
										<FinanceInput
											id="goal-target"
											inputMode="decimal"
											placeholder="$15,000"
											value={field.value}
											onChange={(event) => { field.onChange(formatCurrencyInput(event.target.value)); }}
										/>
									)}
								/>
								{errors.target ? (
									<GoalForm.FieldError>
										{errors.target.message}
									</GoalForm.FieldError>
								) : null}
							</div>
							<div>
								<FieldLabel htmlFor="goal-monthly">
									Monthly
								</FieldLabel>
								<Controller
									control={control}
									name="monthly"
									render={({ field }) => (
										<FinanceInput
											id="goal-monthly"
											inputMode="decimal"
											placeholder="$300"
											value={field.value}
											onChange={(event) => { field.onChange(formatCurrencyInput(event.target.value)); }}
										/>
									)}
								/>
								{errors.monthly ? (
									<GoalForm.FieldError>
										{errors.monthly.message}
									</GoalForm.FieldError>
								) : null}
							</div>
						</GoalForm.AmountsGrid>
					</GoalForm.Body>
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
