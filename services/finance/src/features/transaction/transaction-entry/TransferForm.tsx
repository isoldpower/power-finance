import type { FC } from "react";
import { useEffect, useState } from "react";

import { useWalletsList, gradientFromId } from "@feature/wallet";
import { currencySymbol, sanitizeAmountInput } from "@shared/utils";
import { WalletSelect } from "@entity/wallet";
import type { WalletSelectOption } from "@entity/wallet";
import { FromIcon, ToIcon } from "@entity/transaction";
import { PanelFooter } from "@entity/management";
import { FieldLabel } from "@shared/components";
import type { PanelWallet } from "@feature/management";

import { useTransactionsListMethods } from "../data-presenters/use-transactions-list-methods.ts";

interface TransferFormProps {
	wallet?: PanelWallet;
	onClose: () => void;
}

const TransferForm: FC<TransferFormProps> = ({ wallet, onClose }) => {
	const { wallets } = useWalletsList();
	const { meta } = useTransactionsListMethods();

	const [fromId, setFromId] = useState(wallet?.id ?? '');
	const [toId, setToId] = useState('');
	const [amount, setAmount] = useState('');

	useEffect(() => {
		if (wallets.length === 0) return;
		setFromId((prev) => prev || wallets[0].id);
	}, [wallets]);

	useEffect(() => {
		setToId((prev) => (prev !== '' && prev !== fromId) ? prev : (wallets.find((entry) => entry.id !== fromId)?.id ?? ''));
	}, [wallets, fromId]);

	const from = wallets.find((entry) => entry.id === fromId);
	const to = wallets.find((entry) => entry.id === toId);
	const numericAmount = parseFloat(amount);
	const amountValid = !Number.isNaN(numericAmount) && numericAmount > 0;
	const canSubmit = Boolean(from) && Boolean(to) && toId !== fromId && amountValid && !meta.createMutation.isPending;
	const fromCurrency = from?.balance.currency ?? 'USD';

	const walletOptions = (excludeId?: string): WalletSelectOption[] =>
		wallets
			.filter((entry) => entry.id !== excludeId)
			.map((entry) => ({ id: entry.id, name: entry.name, currency: entry.balance.currency, gradient: gradientFromId(entry.id) }));

	const onSubmit = () => {
		if (!canSubmit) return;
		const abs = Math.abs(numericAmount).toFixed(2);
		Promise.all([
			meta.createMutation.mutateAsync({ data: { source_wallet_id: fromId, amount: `-${abs}` } }),
			meta.createMutation.mutateAsync({ data: { source_wallet_id: toId, amount: abs } }),
		])
			.then(() => { onClose(); })
			.catch((error: unknown) => { console.error(error); });
	};

	return (
		<>
			<div className="flex-1 overflow-auto p-5">
				<FieldLabel>Wallets</FieldLabel>
				<WalletSelect
					leadingIcon={<FromIcon className="flex-none text-text-3" />}
					options={walletOptions()}
					value={fromId}
					onChange={setFromId}
					emptyLabel="No wallets yet"
					className="mb-2"
				/>

				<WalletSelect
					leadingIcon={<ToIcon className="flex-none text-text-3" />}
					options={walletOptions(fromId)}
					value={toId}
					onChange={setToId}
					emptyLabel="Add another wallet"
					className="mb-2"
				/>

				<FieldLabel>Amount</FieldLabel>
				<div className="mb-3 flex items-center gap-2 rounded-[var(--radius-md)] border-[1.5px] border-primary px-4 py-3.5 shadow-[0_0_0_3px_var(--accent-soft)]">
					<span className="font-display text-2xl text-text-2">{currencySymbol(fromCurrency)}</span>
					<input value={amount} onChange={(event) => { setAmount(sanitizeAmountInput(event.target.value)); }} inputMode="decimal" placeholder="0.00" className="min-w-0 flex-1 border-none bg-transparent font-display text-3xl font-semibold outline-none placeholder:text-[var(--text-3)]" />
				</div>
				{from && to ? (
					<div className="text-xs leading-snug text-text-3">Moves money from {from.name} to {to.name}. Posts a balanced transfer to the ledger.</div>
				) : (
					<div className="text-xs leading-snug text-text-3">Add a second wallet to transfer between accounts.</div>
				)}
			</div>
			<PanelFooter
				submitLabel={meta.createMutation.isPending ? 'Sending…' : 'Send transfer'}
				onClose={onClose}
				onSubmit={onSubmit}
				submitDisabled={!canSubmit}
			/>
		</>
	);
};

TransferForm.displayName = 'TransferForm';

export { TransferForm };
export type { TransferFormProps };
