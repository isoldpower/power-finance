import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RuleForm } from "@entity/assistance";
import {
	RULE_FORM_DEFAULTS,
	RuleFormOnSubmit,
	ruleFormSchema,
	useRuleConditions,
	useRuleFormState,
} from "@feature/assistance";
import {
	RuleChoiceControl,
	RuleConditionsControl,
	RuleNameControl,
	RuleTextControl,
	RuleTriggerTypeControl,
} from "@widget/assistance";
import { SlideOver, useSlideOverContext } from "@shared/overlays";
import { HideOnFormValue, PanelFooter, ShowOnFormValue } from "@shared/forms";
import { StackedList } from "@shared/pure-components/layout";
import { BodyText } from "@shared/pure-components/typography";
import {
	ADD_CONDITION_LABEL,
	COMBINATOR_OPTIONS,
	CONDITIONS_HINT,
	CONDITIONS_LABEL,
	EFFECT_TYPE_OPTIONS,
	PANEL_DESCRIPTION,
	PANEL_TITLE,
	RULE_ICON_OPTIONS,
	SEVERITY_OPTIONS,
	SUBMIT_LABEL,
	SUBMIT_PENDING_LABEL,
	TRIGGER_EVENT_OPTIONS,
	TRIGGER_SCHEDULE_OPTIONS,
	TRIGGER_TYPE_OPTIONS,
} from "./config.ts";

import type { FC } from "react";
import type { RuleFormSchema } from "@feature/assistance";


const NewRulePanel: FC = () => {
	const { onClose } = useSlideOverContext();
	const { handleSubmit, control, formState: { errors } } = useForm<RuleFormSchema>({
		resolver: zodResolver(ruleFormSchema),
		defaultValues: RULE_FORM_DEFAULTS,
	});
	const { loading, methods } = useRuleFormState();
	const { conditionRows, filterFields, onAppend, onRemove } = useRuleConditions(control);

	return (
		<>
			<SlideOver.Heading>
				<StackedList gap={2}>
					<SlideOver.Title>
						{PANEL_TITLE}
					</SlideOver.Title>
					<BodyText size="12.5" leading="relaxed" className="mb-2 text-balance">
						{PANEL_DESCRIPTION}
					</BodyText>
				</StackedList>
				<div className="flex h-full shrink-0 items-start pl-4">
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
					<RuleNameControl
						control={control}
						label="Rule name and icon"
						placeholder="Auto-categorise coffee shops"
						iconOptions={RULE_ICON_OPTIONS}
						error={errors.name?.message}
						disabled={loading}
					/>
					<RuleTriggerTypeControl
						control={control}
						label="When should the rule run?"
						options={TRIGGER_TYPE_OPTIONS}
						disabled={loading}
					/>
					<ShowOnFormValue valueKey="triggerType" showOn={['event']} control={control}>
						<RuleChoiceControl
							control={control}
							name="event"
							label="Which event starts the rule?"
							options={TRIGGER_EVENT_OPTIONS}
							ariaLabel="Trigger event"
							placeholder="Select event"
							error={errors.event?.message}
							disabled={loading}
						/>
					</ShowOnFormValue>
					<HideOnFormValue valueKey="triggerType" hideOn={['event']} control={control}>
						<RuleChoiceControl
							control={control}
							name="schedule"
							label="How often should it run?"
							options={TRIGGER_SCHEDULE_OPTIONS}
							ariaLabel="Trigger schedule"
							placeholder="Select schedule"
							error={errors.schedule?.message}
							disabled={loading}
						/>
					</HideOnFormValue>
					<RuleConditionsControl
						control={control}
						conditionRows={conditionRows}
						filterFields={filterFields}
						combinatorOptions={COMBINATOR_OPTIONS}
						label={CONDITIONS_LABEL}
						emptyHint={CONDITIONS_HINT}
						addLabel={ADD_CONDITION_LABEL}
						disabled={loading}
						onAppend={onAppend}
						onRemove={onRemove}
					/>
					<RuleChoiceControl
						control={control}
						name="effectType"
						label="What should happen?"
						options={EFFECT_TYPE_OPTIONS}
						ariaLabel="Rule effect"
						placeholder="Select effect"
						error={errors.effectType?.message}
						disabled={loading}
					/>
					<ShowOnFormValue valueKey="effectType" showOn={['set_category']} control={control}>
						<RuleTextControl
							control={control}
							name="category"
							label="Category to apply"
							placeholder="Dining"
							error={errors.category?.message}
							disabled={loading}
						/>
					</ShowOnFormValue>
					<ShowOnFormValue valueKey="effectType" showOn={['notify', 'raise_action']} control={control}>
						<RuleChoiceControl
							control={control}
							name="severity"
							label="How urgent is it?"
							options={SEVERITY_OPTIONS}
							ariaLabel="Severity"
							placeholder="Select severity"
							error={errors.severity?.message}
							disabled={loading}
						/>
						<RuleTextControl
							control={control}
							name="title"
							label="Message title"
							placeholder="Large charge posted"
							error={errors.title?.message}
							disabled={loading}
						/>
					</ShowOnFormValue>
					<ShowOnFormValue valueKey="effectType" showOn={['raise_action']} control={control}>
						<RuleTextControl
							control={control}
							name="body"
							label="Message body"
							placeholder="Review this charge"
							error={errors.body?.message}
							disabled={loading}
						/>
					</ShowOnFormValue>
					<ShowOnFormValue valueKey="effectType" showOn={['transfer']} control={control}>
						<RuleTextControl
							control={control}
							name="fromWalletId"
							label="Transfer from wallet"
							placeholder="Wallet id"
							error={errors.fromWalletId?.message}
							disabled={loading}
						/>
						<RuleTextControl
							control={control}
							name="toWalletId"
							label="Transfer to wallet"
							placeholder="Wallet id"
							error={errors.toWalletId?.message}
							disabled={loading}
						/>
						<RuleTextControl
							control={control}
							name="amount"
							label="Amount to transfer"
							placeholder="200.00"
							error={errors.amount?.message}
							disabled={loading}
						/>
						<RuleTextControl
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
					submitLabel={loading ? SUBMIT_PENDING_LABEL : SUBMIT_LABEL}
					onClose={onClose}
					submitDisabled={loading}
				/>
			</RuleFormOnSubmit>
		</>
	);
};

NewRulePanel.displayName = 'NewRulePanel';

export { NewRulePanel };
