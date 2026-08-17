import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RuleForm } from "@entity/assistance";
import { HideOnFormValue, PanelFooter, ShowOnFormValue } from "@shared/forms";
import {
	RULE_FORM_DEFAULTS,
	ruleFieldsFor,
	RuleFormOnSubmit,
	ruleFormSchema,
	useRuleFormState,
} from "@feature/assistance";
import {
	RuleConditionList,
	RuleEffectTypeField,
	RuleEventField,
	RuleNameField,
	RuleScheduleField,
	RuleSeverityField,
	RuleTextField,
	RuleTriggerTypeField,
} from "@widget/assistance";
import { SlideOver, useSlideOverContext } from "@shared/overlays";
import { BodyText } from "@shared/pure-components/typography";
import { StackedList } from "@shared/pure-components/layout";

import type { RuleFormSchema } from "@feature/assistance";
import type { FC } from "react";


const NewRulePanel: FC = () => {
	const { onClose } = useSlideOverContext();
	const { handleSubmit, control, formState: { errors } } = useForm<RuleFormSchema>({
		resolver: zodResolver(ruleFormSchema),
		defaultValues: RULE_FORM_DEFAULTS,
	});
	const { loading, methods } = useRuleFormState();

	return (
		<>
			<SlideOver.Heading>
				<StackedList gap={2}>
					<SlideOver.Title>
						New automation rule
					</SlideOver.Title>
					<BodyText size="12.5" leading="relaxed" className="mb-2 text-balance">
						Run an effect automatically whenever the trigger matches. Leave the conditions empty
						to run every time.
					</BodyText>
				</StackedList>
				<div className='pl-4 shrink-0 h-full flex items-start'>
					<SlideOver.Collapse>
						✕
					</SlideOver.Collapse>
				</div>
			</SlideOver.Heading>
			<RuleFormOnSubmit
				className="flex flex-1 flex-col overflow-hidden"
				handleSubmit={handleSubmit}
				onBeforeSubmit={methods.handleLoading}
				onSuccess={() => { methods.handleDoneLoading(); onClose(); }}
				onError={methods.handleFailedLoading}
			>
				<RuleForm>
					<RuleNameField control={control} error={errors.name?.message} disabled={loading} />
					<RuleTriggerTypeField control={control} disabled={loading} />
					<ShowOnFormValue valueKey="triggerType" showOn={['event']} control={control}>
						<RuleEventField control={control} error={errors.event?.message} disabled={loading} />
					</ShowOnFormValue>
					<HideOnFormValue valueKey="triggerType" hideOn={['event']} control={control}>
						<RuleScheduleField control={control} error={errors.schedule?.message} disabled={loading} />
					</HideOnFormValue>
					<RuleConditionList control={control} resolveFields={ruleFieldsFor} disabled={loading} />
					<RuleEffectTypeField control={control} error={errors.effectType?.message} disabled={loading} />
					<ShowOnFormValue valueKey="effectType" showOn={['set_category']} control={control}>
						<RuleTextField
							control={control}
							name="category"
							label="Category to apply"
							placeholder="Dining"
							error={errors.category?.message}
							disabled={loading}
						/>
					</ShowOnFormValue>
					<ShowOnFormValue valueKey="effectType" showOn={['notify', 'raise_action']} control={control}>
						<RuleSeverityField control={control} error={errors.severity?.message} disabled={loading} />
						<RuleTextField
							control={control}
							name="title"
							label="Message title"
							placeholder="Large charge posted"
							error={errors.title?.message}
							disabled={loading}
						/>
					</ShowOnFormValue>
					<ShowOnFormValue valueKey="effectType" showOn={['raise_action']} control={control}>
						<RuleTextField
							control={control}
							name="body"
							label="Message body"
							placeholder="Review this charge"
							error={errors.body?.message}
							disabled={loading}
						/>
					</ShowOnFormValue>
					<ShowOnFormValue valueKey="effectType" showOn={['transfer']} control={control}>
						<RuleTextField
							control={control}
							name="fromWalletId"
							label="Transfer from wallet"
							placeholder="Wallet id"
							error={errors.fromWalletId?.message}
							disabled={loading}
						/>
						<RuleTextField
							control={control}
							name="toWalletId"
							label="Transfer to wallet"
							placeholder="Wallet id"
							error={errors.toWalletId?.message}
							disabled={loading}
						/>
						<RuleTextField
							control={control}
							name="amount"
							label="Amount to transfer"
							placeholder="200.00"
							error={errors.amount?.message}
							disabled={loading}
						/>
						<RuleTextField
							control={control}
							name="currency"
							label="Transfer currency"
							placeholder="USD"
							error={errors.currency?.message}
							disabled={loading}
						/>
					</ShowOnFormValue>
				</RuleForm>
				<PanelFooter
					submitType="submit"
					submitLabel={loading ? 'Creating…' : 'Create rule'}
					onClose={onClose}
					submitDisabled={loading}
				/>
			</RuleFormOnSubmit>
		</>
	);
};

NewRulePanel.displayName = 'NewRulePanel';

export { NewRulePanel };
