import { useState } from "react";
import { createPortal } from "react-dom";
import type { FC, ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FinanceButton, FinanceInput } from "@internal/ui-library";

import { useCreateAutomation } from "@feature/automations";

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

const Label: FC<{ children: ReactNode; htmlFor?: string }> = ({ children, htmlFor }) => (
	<label htmlFor={htmlFor} className="mb-1.5 block text-[11.5px] text-text-3">{children}</label>
);

interface NewRulePanelProps {
	children: ReactNode;
}

const NewRulePanel: FC<NewRulePanelProps> = ({ children }) => {
	const [open, setOpen] = useState(false);
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
		setOpen(false);
		reset(defaultValues);
	};

	const onSubmit = handleSubmit((data) => {
		createAutomation.mutate(data, { onSuccess: () => { close(); } });
	});

	return (
		<>
			<span className="contents" onClick={() => { setOpen(true); }}>{children}</span>
			{open ? createPortal(
				<div className="finance-theme">
					<div onClick={close} className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]" />
					<div className="fixed inset-y-0 right-0 z-[41] flex w-[440px] max-w-[92vw] flex-col border-l border-border bg-card shadow-[var(--shadow-lg)] animate-in slide-in-from-right duration-200">
						<div className="flex items-center gap-2.5 border-b border-border px-5 py-4">
							<span className="flex-1 font-display text-[17px] font-semibold">New automation rule</span>
							<button type="button" onClick={close} className="flex size-7 items-center justify-center rounded-[var(--radius-md)] border border-border-strong text-text-2 hover:bg-secondary">✕</button>
						</div>

						<form onSubmit={(e) => { void onSubmit(e); }} className="flex flex-1 flex-col overflow-hidden">
							<div className="flex-1 overflow-auto p-5">
								<p className="mb-5 text-[12.5px] leading-relaxed text-text-2">Run an action automatically whenever the trigger matches.</p>

								<Label htmlFor="rule-name">Name</Label>
								<FinanceInput id="rule-name" placeholder="Auto-categorize coffee shops" className="mb-4" {...register('name')} />
								{errors.name ? <div className="-mt-3 mb-4 text-[11.5px] text-neg">{errors.name.message}</div> : null}

								<Label htmlFor="rule-trigger">When (trigger)</Label>
								<FinanceInput id="rule-trigger" placeholder='merchant ~ "coffee"' className="mb-4" {...register('trigger')} />
								{errors.trigger ? <div className="-mt-3 mb-4 text-[11.5px] text-neg">{errors.trigger.message}</div> : null}

								<Label htmlFor="rule-action">Then (action)</Label>
								<FinanceInput id="rule-action" placeholder="set category Dining" className="mb-4" {...register('action')} />
								{errors.action ? <div className="-mt-3 mb-4 text-[11.5px] text-neg">{errors.action.message}</div> : null}

								<Label htmlFor="rule-frequency">Frequency</Label>
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
					</div>
				</div>,
				document.body
			) : null}
		</>
	);
};

NewRulePanel.displayName = 'NewRulePanel';

export { NewRulePanel };
export type { NewRulePanelProps };
