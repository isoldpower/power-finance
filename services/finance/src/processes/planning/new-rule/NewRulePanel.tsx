import type { FC, ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FinanceButton, FinanceInput } from "@internal/ui-library";

import { useCreateAutomation } from "@feature/automations";
import { useDisclosure } from "@shared/utils";
import { SlideOver, DisclosureTrigger, FieldLabel } from "@shared/components";

const ruleSchema = z.object({
	name: z.string().min(1, "Name is required"),
	trigger: z.string().min(1, "Trigger is required"),
	action: z.string().min(1, "Action is required"),
	frequency: z.string().min(1, "Frequency is required"),
});

type RuleSchema = z.infer<typeof ruleSchema>;

const defaultValues: RuleSchema = {
	name: '',
	trigger: '',
	action: '',
	frequency: 'realtime',
};

interface NewRulePanelProps {
	children: ReactNode;
}

const NewRulePanel: FC<NewRulePanelProps> = ({ children }) => {
	const { open, onOpen, onClose } = useDisclosure();
	const createAutomation = useCreateAutomation();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<RuleSchema>({
		resolver: zodResolver(ruleSchema),
		defaultValues,
	});

	const close = () => {
		onClose();
		reset(defaultValues);
	};

	const onSubmit = handleSubmit((data) => {
		createAutomation.mutate(data, { onSuccess: () => { close(); } });
	});

	return (
		<>
			<DisclosureTrigger onOpen={onOpen}>{children}</DisclosureTrigger>
			<SlideOver open={open} onClose={close} title="New automation rule">
				<form onSubmit={(e) => { void onSubmit(e); }} className="flex flex-1 flex-col overflow-hidden">
					<div className="flex-1 overflow-auto p-5">
						<p className="mb-5 text-[12.5px] leading-relaxed text-text-2">Run an action automatically whenever the trigger matches.</p>

						<FieldLabel htmlFor="rule-name">Name</FieldLabel>
						<FinanceInput id="rule-name" placeholder="Auto-categorize coffee shops" className="mb-4" {...register('name')} />
						{errors.name ? <div className="-mt-3 mb-4 text-[11.5px] text-neg">{errors.name.message}</div> : null}

						<FieldLabel htmlFor="rule-trigger">When (trigger)</FieldLabel>
						<FinanceInput id="rule-trigger" placeholder='merchant ~ "coffee"' className="mb-4" {...register('trigger')} />
						{errors.trigger ? <div className="-mt-3 mb-4 text-[11.5px] text-neg">{errors.trigger.message}</div> : null}

						<FieldLabel htmlFor="rule-action">Then (action)</FieldLabel>
						<FinanceInput id="rule-action" placeholder="set category Dining" className="mb-4" {...register('action')} />
						{errors.action ? <div className="-mt-3 mb-4 text-[11.5px] text-neg">{errors.action.message}</div> : null}

						<FieldLabel htmlFor="rule-frequency">Frequency</FieldLabel>
						<FinanceInput id="rule-frequency" placeholder="realtime" {...register('frequency')} />
						{errors.frequency ? <div className="mt-1 text-[11.5px] text-neg">{errors.frequency.message}</div> : null}
					</div>

					<div className="flex gap-2.5 border-t border-border px-5 py-4">
						<FinanceButton type="submit" size="lg" className="flex-1 shadow-[0_4px_14px_var(--glow)]" disabled={createAutomation.isPending}>
							{createAutomation.isPending ? 'Creating…' : 'Create rule'}
						</FinanceButton>
						<FinanceButton type="button" size="lg" variant="outline" onClick={close}>Cancel</FinanceButton>
					</div>
				</form>
			</SlideOver>
		</>
	);
};

NewRulePanel.displayName = 'NewRulePanel';

export { NewRulePanel };
export type { NewRulePanelProps };
