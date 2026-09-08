import { describe, expect, test, vi } from 'vitest';
import { cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm } from 'react-hook-form';

import { goalFormSchema } from './goal-form-schema.ts';

import type { FC } from 'react';
import type { GoalDraft } from '@entity/wallets';
import type { GoalFormSchema } from './goal-form-schema.ts';


const drafts: GoalDraft[] = [];

vi.mock('../data-presenters', () => ({
	useCreateGoal: () => ({
		mutateAsync: (draft: GoalDraft) => {
			drafts.push(draft);

			return Promise.resolve({});
		},
	}),
}));

const { GoalFormOnSubmit } = await import('./GoalFormOnSubmit.tsx');

const completeGoal = (overrides: Partial<GoalFormSchema> = {}): GoalFormSchema => ({
	name: 'New car',
	target: '15,000',
	finishAt: '2027-01-01',
	currency: 'USD',
	...overrides,
});

const CreateGoalHarness: FC<{ values: GoalFormSchema }> = ({ values }) => {
	const { handleSubmit } = useForm<GoalFormSchema>({ defaultValues: values });

	return (
		<GoalFormOnSubmit handleSubmit={handleSubmit}>
			<button type="submit">Create goal</button>
		</GoalFormOnSubmit>
	);
};

const createGoal = async (values: GoalFormSchema): Promise<GoalDraft> => {
	cleanup();
	drafts.length = 0;
	render(<CreateGoalHarness values={values} />);
	fireEvent.click(screen.getByText('Create goal'));
	await waitFor(() => { expect(drafts).toHaveLength(1); });

	return drafts[0];
};

describe('choosing a currency for a new goal', () => {
	test('opens the goal in the currency the form picked', async () => {
		const draft = await createGoal(completeGoal({ currency: 'JPY' }));

		expect(draft.currency).toBe('JPY');
	});

	test('does not force every goal into one currency', async () => {
		const first = await createGoal(completeGoal({ currency: 'EUR' }));
		const second = await createGoal(completeGoal({ currency: 'GBP' }));

		expect([first.currency, second.currency]).toEqual(['EUR', 'GBP']);
	});

	test('still carries the rest of the goal', async () => {
		const draft = await createGoal(completeGoal({ name: 'New car', target: '15,000' }));

		expect(draft).toMatchObject({ name: 'New car', target: '15000' });
	});
});

describe('the goal form', () => {
	test('accepts a goal that names its currency', () => {
		expect(goalFormSchema.safeParse(completeGoal()).success).toBe(true);
	});

	test('will not submit without a currency', () => {
		const result = goalFormSchema.safeParse(completeGoal({ currency: '' }));

		expect(result.success).toBe(false);
	});
});
