import { describe, expect, it, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { sanitizeAmountInput } from "@shared/formatting";
import { quickAddSchema } from "./quick-add-schema.ts";
import type { QuickAddSchema } from "./quick-add-schema.ts";

vi.mock("@feature/localization", () => ({
	useCurrencyPairRate: (from: string, to: string) => ({
		rate: from === to ? 1 : 1.087,
		isPending: false,
	}),
}));


const { useCrossCurrencyTransfer } = await import("../form-state/use-cross-currency-transfer.ts");
const { useWalletsCurrencies } = await import("../form-state/use-wallets-currencies.ts");
const { useEntryTypeEffects } = await import("../form-state/use-entry-type-effects.ts");
const { useEntryFormState } = await import("../form-state/use-entry-form-state.ts");
const { useEntryWalletOptions } = await import("../form-state/use-entry-wallet-options.ts");
const { useQuickAddInitials } = await import("./use-quick-add-initials.ts");

const WALLETS = [
	{ id: 'a', name: 'A', balance: { amount: 0, currency: 'USD' }, color: 'x' },
	{ id: 'b', name: 'B', balance: { amount: 0, currency: 'EUR' }, color: 'y' },
] as never[];

const WALLET_OPTIONS = [
	{ id: 'a', name: 'A', currency: 'USD', gradient: 'x' },
	{ id: 'b', name: 'B', currency: 'EUR', gradient: 'y' },
];

const RATE = 1.087;

const renderQuickAddHooks = (counter: { renders: number }) => renderHook(() => {
	counter.renders += 1;
	if (counter.renders > 300) throw new Error('render loop: exceeded 300 renders');

	const defaultValues = useQuickAddInitials(WALLETS);
	const form = useForm<QuickAddSchema>({
		defaultValues,
		mode: 'onChange',
		resolver: zodResolver(quickAddSchema),
	});
	useWatch({ control: form.control, name: 'type' });

	const { toCurrency, fromCurrency } = useWalletsCurrencies(WALLETS, form);
	useEntryFormState(form);
	useEntryWalletOptions(WALLET_OPTIONS, form);
	const transfer = useCrossCurrencyTransfer(fromCurrency, toCurrency, form);
	useEntryTypeEffects(defaultValues, form);

	return { form, transfer };
});

const typeInto = (
	result: { current: ReturnType<typeof renderQuickAddHooks>['result']['current'] },
	side: 'sent' | 'received',
	keys: string[]
) => {
	const field = side === 'sent' ? 'amount' : 'receiveAmount';

	for (const key of keys) {
		act(() => {
			const shown = result.current.form.getValues(field);
			const next = sanitizeAmountInput(shown + key);
			if (side === 'sent') {
				result.current.transfer.handleSentChange(next);
				return;
			}
			result.current.transfer.handleReceivedChange(next);
		});
	}
};

describe("quick-add amount sync", () => {
	it("preserves what the user types into the send field", () => {
		const counter = { renders: 0 };
		const { result } = renderQuickAddHooks(counter);
		act(() => { result.current.form.setValue('type', 'transfer', { shouldDirty: true }); });

		typeInto(result, 'sent', ['1', '2', '3', '.', '5']);

		expect(result.current.form.getValues('amount')).toBe('123.5');
		expect(result.current.form.getValues('receiveAmount')).toBe((123.5 * RATE).toFixed(2));
	});

	it("preserves what the user types into the receive field", () => {
		const counter = { renders: 0 };
		const { result } = renderQuickAddHooks(counter);
		act(() => { result.current.form.setValue('type', 'transfer', { shouldDirty: true }); });

		typeInto(result, 'received', ['5', '0', '.', '2', '5']);

		expect(result.current.form.getValues('receiveAmount')).toBe('50.25');
		expect(result.current.form.getValues('amount')).toBe((50.25 / RATE).toFixed(2));
	});

	it("settles without a render loop while editing", () => {
		const counter = { renders: 0 };
		const { result } = renderQuickAddHooks(counter);
		act(() => { result.current.form.setValue('type', 'transfer', { shouldDirty: true }); });

		const before = counter.renders;
		typeInto(result, 'sent', ['1', '0', '0']);

		expect(counter.renders - before).toBeLessThan(30);
	});
});
