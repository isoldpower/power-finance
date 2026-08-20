import { cn, FinanceButton, FinanceCard, UiForm } from "@internal/ui-library";
import { QuickAddLink, QuickAddTitle } from "@entity/transactions";
import {
	quickAddSchema,
	TransactionEntryOnSubmit,
	useQuickAddInitials,
	useTransactionCategories,
	useTransactionEntryForm,
} from "@feature/transactions";
import { useWalletsList } from "@feature/wallets";
import {
	EntryAmountControl,
	EntryCategoryControl,
	EntryTypeControl,
	EntryWalletControl,
} from "@widget/transactions";
import { HideOnFormValue, ShowOnFormValue } from "@shared/forms";
import { FromIcon, ToIcon } from "@shared/pure-components/icons";
import { MetaText, Text } from "@shared/pure-components/typography";

import type { FC } from "react";


interface QuickAddPanelProps {
	className?: string;
}

const QuickAddPanel: FC<QuickAddPanelProps> = ({ className }) => {
	const { wallets } = useWalletsList({
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});
	const defaultValues = useQuickAddInitials(wallets);
	const { categoryLabels } = useTransactionCategories();
	const {
		form,
		type,
		currency,
		fromCurrency,
		toCurrency,
		fromOptions,
		toOptions,
		handleSentChange,
		handleReceivedChange,
		state: { loading, canSubmit, methods },
	} = useTransactionEntryForm({ schema: quickAddSchema, defaultValues, wallets });

	return (
		<FinanceCard className={cn("p-4", className)}>
			<div className="mb-3 flex items-center gap-2">
				<QuickAddTitle>
					Quick add
				</QuickAddTitle>
				<MetaText size="10">
					SIMPLE
				</MetaText>
			</div>
			<UiForm {...form}>
				<TransactionEntryOnSubmit
					handleSubmit={form.handleSubmit}
					fromCurrency={fromCurrency}
					toCurrency={toCurrency}
					onBeforeEdit={methods.handleLoading}
					onSuccess={methods.handleDoneLoading}
					onError={methods.handleFailedLoading}
				>
					<EntryTypeControl
						control={form.control}
						name="type"
						className="mb-3.5"
						disabled={loading}
					/>
					<HideOnFormValue valueKey="type" hideOn={['transfer']} control={form.control}>
						<EntryAmountControl
							control={form.control}
							name="amount"
							type={type}
							currency={currency}
							className="mt-2"
							disabled={loading}
						/>
					</HideOnFormValue>
					<HideOnFormValue valueKey="type" hideOn={['income']} control={form.control}>
						<EntryWalletControl
							control={form.control}
							name="fromWallet"
							options={fromOptions}
							emptyLabel="No wallets yet"
							placeholder="Select wallet"
							leadingIcon={<FromIcon className="flex-none text-text-3" />}
							showSwatch={false}
							className="mt-2"
							disabled={loading}
						/>
					</HideOnFormValue>
					<HideOnFormValue valueKey="type" hideOn={['expense']} control={form.control}>
						<EntryWalletControl
							control={form.control}
							name="toWallet"
							options={toOptions}
							emptyLabel="Add another wallet"
							placeholder="Select wallet"
							leadingIcon={<ToIcon className="flex-none text-text-3" />}
							showSwatch={false}
							className="mt-2"
							disabled={loading}
						/>
					</HideOnFormValue>
					<ShowOnFormValue valueKey="type" showOn={['transfer']} control={form.control}>
						<EntryAmountControl
							control={form.control}
							name="amount"
							type={type}
							currency={fromCurrency}
							label="Send"
							className="mt-2"
							disabled={loading}
							onChange={handleSentChange}
						/>
						<EntryAmountControl
							control={form.control}
							name="receiveAmount"
							type={type}
							currency={toCurrency}
							label="Receive"
							className="mt-2"
							disabled={loading}
							onChange={handleReceivedChange}
						/>
					</ShowOnFormValue>
					<HideOnFormValue valueKey="type" hideOn={['transfer']} control={form.control}>
						<EntryCategoryControl
							control={form.control}
							name="category"
							options={categoryLabels}
							className="mt-3.5"
							disabled={loading}
						/>
					</HideOnFormValue>
					<FinanceButton
						type="submit"
						size="lg"
						className="mt-3.5 w-full"
						disabled={!canSubmit}
					>
						{loading ? 'Adding…' : '＋ Add transaction'}
					</FinanceButton>
				</TransactionEntryOnSubmit>
			</UiForm>
			<QuickAddLink to="management">
				Need to scan a receipt or edit?
				<Text weight="semibold" tone="accent">
					&nbsp;Open Management →
				</Text>
			</QuickAddLink>
		</FinanceCard>
	);
};

QuickAddPanel.displayName = 'QuickAddPanel';

export { QuickAddPanel };
export type { QuickAddPanelProps };
