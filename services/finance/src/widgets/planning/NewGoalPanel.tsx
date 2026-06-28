import { useState } from "react";
import { createPortal } from "react-dom";
import type { FC, ReactNode } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	cn,
	FinanceButton,
	FinanceInput,
	FinanceMenu,
	FinanceMenuTrigger,
	FinanceMenuContent,
} from "@internal/ui-library";

import { useCreateGoal } from "@feature/goals";
import { sanitizeAmountInput } from "@shared/utils";

const EMOJI_OPTIONS = ['🎯', '🛟', '✈', '🏠', '🚗', '💍', '🎓', '🏖', '💰', '📈', '🐷', '🎁', '🏥', '👶', '💻', '🎸'];

// Strips letters, keeps digits + one decimal, then renders as "$1,234.56" so the
// goal amount fields only ever accept currency-formatted input.
const formatCurrencyInput = (raw: string): string => {
	const sanitized = sanitizeAmountInput(raw);
	if (sanitized === '') return '';
	const dotIndex = sanitized.indexOf('.');
	const whole = dotIndex === -1 ? sanitized : sanitized.slice(0, dotIndex);
	const grouped = (whole === '' ? '0' : whole).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	return dotIndex === -1 ? `$${grouped}` : `$${grouped}.${sanitized.slice(dotIndex + 1)}`;
};

const goalSchema = z.object({
	name: z.string().min(1, "Name is required"),
	target: z.string().min(1, "Target is required"),
	monthly: z.string().min(1, "Monthly contribution is required"),
	icon: z.string().optional(),
});

type GoalSchema = z.infer<typeof goalSchema>;

const defaultValues: GoalSchema = {
	name: '',
	target: '',
	monthly: '',
	icon: '🎯',
};

const Label: FC<{ children: ReactNode; htmlFor?: string }> = ({ children, htmlFor }) => (
	<label htmlFor={htmlFor} className="mb-1.5 block text-[11.5px] text-text-3">{children}</label>
);

const EmojiPicker: FC<{ value: string; onChange: (emoji: string) => void }> = ({ value, onChange }) => {
	const [open, setOpen] = useState(false);

	return (
		<FinanceMenu open={open} onOpenChange={setOpen}>
			<FinanceMenuTrigger asChild>
				<button
					type="button"
					aria-label="Choose icon"
					className="flex size-10 flex-none items-center justify-center rounded-[var(--radius-md)] border border-border-strong bg-card text-[18px] hover:bg-secondary"
				>
					{value || '🎯'}
				</button>
			</FinanceMenuTrigger>
			<FinanceMenuContent align="start" className="p-2">
				<div className="grid grid-cols-6 gap-1">
					{EMOJI_OPTIONS.map((emoji) => (
						<button
							key={emoji}
							type="button"
							onClick={() => { onChange(emoji); setOpen(false); }}
							className={cn(
								"flex size-8 items-center justify-center rounded-[var(--radius-sm)] text-[18px] hover:bg-secondary",
								value === emoji && "bg-secondary ring-1 ring-primary"
							)}
						>
							{emoji}
						</button>
					))}
				</div>
			</FinanceMenuContent>
		</FinanceMenu>
	);
};

interface NewGoalPanelProps {
	children: ReactNode;
}

const NewGoalPanel: FC<NewGoalPanelProps> = ({ children }) => {
	const [open, setOpen] = useState(false);
	const createGoal = useCreateGoal();
	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<GoalSchema>({
		resolver: zodResolver(goalSchema),
		defaultValues,
	});

	const close = () => {
		setOpen(false);
		reset(defaultValues);
	};

	const onSubmit = handleSubmit((data) => {
		createGoal.mutate(
			{
				name: data.name,
				target: data.target,
				monthly: data.monthly,
				icon: data.icon?.trim() ? data.icon.trim() : undefined,
			},
			{ onSuccess: () => { close(); } }
		);
	});

	return (
		<>
			<span className="contents" onClick={() => { setOpen(true); }}>{children}</span>
			{open ? createPortal(
				<div className="finance-theme">
					<div onClick={close} className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]" />
					<div className="fixed inset-y-0 right-0 z-[41] flex w-[440px] max-w-[92vw] flex-col border-l border-border bg-card shadow-[var(--shadow-lg)] animate-in slide-in-from-right duration-200">
						<div className="flex items-center gap-2.5 border-b border-border px-5 py-4">
							<span className="flex-1 font-display text-[17px] font-semibold">New goal</span>
							<button type="button" onClick={close} className="flex size-7 items-center justify-center rounded-[var(--radius-md)] border border-border-strong text-text-2 hover:bg-secondary">✕</button>
						</div>

						<form onSubmit={(e) => { void onSubmit(e); }} className="flex flex-1 flex-col overflow-hidden">
							<div className="flex-1 overflow-auto p-5">
								<p className="mb-5 text-[12.5px] leading-relaxed text-text-2">Set a target and a monthly contribution to track your progress.</p>

								<div className="mb-4">
									<Label htmlFor="goal-name">Name</Label>
									<div className="flex items-center gap-2.5">
										<Controller
											control={control}
											name="icon"
											render={({ field }) => (
												<EmojiPicker value={field.value ?? ''} onChange={field.onChange} />
											)}
										/>
										<FinanceInput id="goal-name" placeholder="Emergency fund" className="flex-1" {...register('name')} />
									</div>
									{errors.name ? <div className="mt-1 text-[11.5px] text-neg">{errors.name.message}</div> : null}
								</div>

								<div className="mb-4 grid grid-cols-2 gap-3">
									<div>
										<Label htmlFor="goal-target">Target</Label>
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
										{errors.target ? <div className="mt-1 text-[11.5px] text-neg">{errors.target.message}</div> : null}
									</div>
									<div>
										<Label htmlFor="goal-monthly">Monthly</Label>
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
										{errors.monthly ? <div className="mt-1 text-[11.5px] text-neg">{errors.monthly.message}</div> : null}
									</div>
								</div>
							</div>

							<div className="flex gap-2.5 border-t border-border px-5 py-4">
								<FinanceButton type="submit" size="lg" className="flex-1 shadow-[0_4px_14px_var(--glow)]" disabled={createGoal.isPending}>
									{createGoal.isPending ? 'Creating…' : 'Create goal'}
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

NewGoalPanel.displayName = 'NewGoalPanel';

export { NewGoalPanel };
export type { NewGoalPanelProps };
