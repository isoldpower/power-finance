import { describe, expect, it, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { sanitizeAmountInput } from "@shared/utils";
import { quickAddSchema } from "./quick-add-schema.ts";
import type { QuickAddSchema } from "./quick-add-schema.ts";

vi.mock("@feature/localization", () => ({
	useCurrencyPairRate: (from: string, to: string) => ({
		rate: from === to ? 1 : 1.087,
		isPending: false,
	}),
}));

vi.mock("@feature/wallets", () => ({
	useWalletSelectOptions: (wallets: { id: string; name: string; balance: { currency: string }; color: string }[]) =>
		wallets.map((wallet) => ({ id: wallet.id, name: wallet.name, currency: wallet.balance.currency, gradient: wallet.color })),
}));

const { useCrossCurrencyTransfer } = await import("./use-cross-currency-transfer.ts");
const { useWalletsCurrencies } = await import("./use-wallets-currencies.ts");
const { useFormTypeEffects } = await import("./use-form-type-effects.ts");
const { useFormLoadingState } = await import("./use-form-loading-state.ts");
const { useFormWalletsList } = await import("./use-form-wallets-list.tsx");
const { useQuickAddInitials } = await import("./use-quick-add-initials.ts");

const WALLETS = [
	{ id: 'a', name: 'A', balance: { amount: 0, currency: 'USD' }, color: 'x' },
	{ id: 'b', name: 'B', balance: { amount: 0, currency: 'EUR' }, color: 'y' },
] as never[];

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
	useFormLoadingState(form);
	useFormWalletsList(WALLETS, form);
	const transfer = useCrossCurrencyTransfer(fromCurrency, toCurrency, form);
	useFormTypeEffects(defaultValues, form);

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
