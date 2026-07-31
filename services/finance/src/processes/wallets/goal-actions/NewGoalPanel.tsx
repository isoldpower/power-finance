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

import { useCreateGoal } from "@feature/wallets";
import { sanitizeAmountInput } from "@shared/utils";
import { SlideOverPanel, useDisclosure } from "@shared/interactions";
import { FieldLabel } from "@shared/components";

import { EMOJI_OPTIONS } from "@widget/wallets/config.ts";

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

const parseAmountInput = (formatted: string): number => {
	return Number(sanitizeAmountInput(formatted)) || 0;
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

const EmojiPicker: FC<{ value: string; onChange: (emoji: string) => void }> = ({ value, onChange }) => {
	const { open, setOpen, onClose } = useDisclosure();

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
							onClick={() => { onChange(emoji); onClose(); }}
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

	return (
		<SlideOverPanel trigger={children} title="New goal" onClose={() => { reset(defaultValues); }}>
			{({ close }) => {
				const onSubmit = handleSubmit((data) => {
					createGoal.mutate(
						{
							name: data.name,
							targetAmount: parseAmountInput(data.target),
							monthlyAmount: parseAmountInput(data.monthly),
							icon: data.icon?.trim() ? data.icon.trim() : undefined,
						},
						{ onSuccess: close }
					);
				});

				return (
					<form onSubmit={(e) => { void onSubmit(e); }} className="flex flex-1 flex-col overflow-hidden">
					<div className="flex-1 overflow-auto p-5">
						<p className="mb-5 text-[12.5px] leading-relaxed text-text-2">Set a target and a monthly contribution to track your progress.</p>

						<div className="mb-4">
							<FieldLabel htmlFor="goal-name">Name</FieldLabel>
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
								<FieldLabel htmlFor="goal-target">Target</FieldLabel>
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
								<FieldLabel htmlFor="goal-monthly">Monthly</FieldLabel>
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
				);
			}}
		</SlideOverPanel>
	);
};

NewGoalPanel.displayName = 'NewGoalPanel';

export { NewGoalPanel };
export type { NewGoalPanelProps };
