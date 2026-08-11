import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FinanceInput } from "@internal/ui-library";
import { RuleForm } from "@entity/assistance";
import { SlideOverPanel } from "@shared/overlays";
import { FieldLabel, PanelFooter } from "@shared/forms";
import { 
	RULE_FORM_DEFAULTS,
	RuleFormOnSubmit,
	ruleFormSchema,
	useRuleFormState,
} from "@feature/assistance";

import type { RuleFormSchema } from "@feature/assistance";
import type { FC, ReactNode } from "react";


interface NewRulePanelProps {
	children: ReactNode;
}

const NewRulePanel: FC<NewRulePanelProps> = ({ children }) => {
	const { register, handleSubmit, formState: { errors } } = useForm<RuleFormSchema>({
		resolver: zodResolver(ruleFormSchema),
		defaultValues: RULE_FORM_DEFAULTS,
	});
	const { loading, methods } = useRuleFormState();
	
	return (
		<SlideOverPanel trigger={children} title="New automation rule">
			{({ close }) => (
				<RuleFormOnSubmit
					className="flex flex-1 flex-col overflow-hidden"
					handleSubmit={handleSubmit}
					onBeforeSubmit={methods.handleLoading}
					onSuccess={() => { methods.handleDoneLoading(); close(); }}
					onError={methods.handleFailedLoading}
				>
					<RuleForm.Body>
						<RuleForm.Intro>
							Run an action automatically whenever the trigger matches.
						</RuleForm.Intro>
						<>
							<FieldLabel htmlFor="rule-name">
								Name
							</FieldLabel>
							<FinanceInput
								id="rule-name"
								placeholder="Auto-categorize coffee shops"
								className="mb-4"
								{...register('name')} 
							/>
							{errors.name ? (
								<RuleForm.FieldError>
									{errors.name.message}
								</RuleForm.FieldError>
							) : null}
						</>
						<>
							<FieldLabel htmlFor="rule-trigger">
								When (trigger)
							</FieldLabel>
							<FinanceInput 
								id="rule-trigger"
								placeholder='merchant ~ "coffee"'
								className="mb-4"
								{...register('trigger')} 
							/>
							{errors.trigger ? (
								<RuleForm.FieldError>
									{errors.trigger.message}
								</RuleForm.FieldError>
							) : null}
						</>
						<>
							<FieldLabel htmlFor="rule-action">
								Then (action)
							</FieldLabel>
							<FinanceInput 
								id="rule-action"
								placeholder="set category Dining" 
								className="mb-4"
								{...register('action')} 
							/>
							{errors.action ? (
								<RuleForm.FieldError>
									{errors.action.message}
								</RuleForm.FieldError>
							) : null}
						</>
						<>
							<FieldLabel htmlFor="rule-frequency">
								Frequency
							</FieldLabel>
							<FinanceInput 
								id="rule-frequency"
								placeholder="realtime"
								{...register('frequency')}
							/>
							{errors.frequency ? (
								<RuleForm.FieldError spaced={false}>
									{errors.frequency.message}
								</RuleForm.FieldError>
							) : null}
						</>
					</RuleForm.Body>
					<PanelFooter
						submitType="submit"
						submitLabel={loading ? 'Creating…' : 'Create rule'}
						onClose={close}
						submitDisabled={loading}
					/>
				</RuleFormOnSubmit>
			)}
		</SlideOverPanel>
	);
};

NewRulePanel.displayName = 'NewRulePanel';

export { NewRulePanel };
export type { NewRulePanelProps };
