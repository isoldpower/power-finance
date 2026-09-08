import { UiForm } from "@internal/ui-library";
import { TransactionEntryOnSubmit, useFundGoalForm } from "@feature/transactions";
import { useWalletsList } from "@feature/wallets";
import { EntryAmountControl, EntryWalletControl } from "@widget/transactions";
import { FieldLabel, PanelFooter } from "@shared/forms";
import { FromIcon } from "@shared/pure-components/icons";
import { FUND_GOAL_LABELS } from "../config.ts";

import type { FC } from "react";
import type { Goal } from "@entity/wallets";


interface FundGoalFormProps {
	goal: Goal;
	onClose: () => void;
}

const FundGoalForm: FC<FundGoalFormProps> = ({ goal, onClose }) => {
	const { wallets } = useWalletsList();
	const {
		form,
		walletOptions,
		fromCurrency,
		toCurrency,
		convertsCurrency,
		handleSentChange,
		handleReceivedChange,
		state: { loading, canSubmit, methods },
	} = useFundGoalForm({ goal, wallets });

	return (
		<UiForm {...form}>
			<TransactionEntryOnSubmit
				className="flex flex-1 flex-col overflow-hidden"
				handleSubmit={form.handleSubmit}
				fromCurrency={fromCurrency}
				toCurrency={toCurrency}
				onBeforeEdit={methods.handleLoading}
				onSuccess={() => { methods.handleDoneLoading(); onClose(); }}
				onError={methods.handleFailedLoading}
			>
				<div className="flex-1 overflow-auto p-5">
					<FieldLabel>
						{FUND_GOAL_LABELS.source}
					</FieldLabel>
					<EntryWalletControl
						control={form.control}
						name="fromWallet"
						options={walletOptions}
						emptyLabel="No wallets yet"
						placeholder="Select wallet"
						leadingIcon={<FromIcon className="flex-none text-text-3" />}
						className="mb-3.5"
						disabled={loading}
					/>
					<EntryAmountControl
						control={form.control}
						name="amount"
						type="transfer"
						currency={fromCurrency}
						label={convertsCurrency ? FUND_GOAL_LABELS.sent : undefined}
						emphasis="accent"
						className="mb-2.5"
						disabled={loading}
						onChange={handleSentChange}
					/>
					{convertsCurrency ? (
						<EntryAmountControl
							control={form.control}
							name="receiveAmount"
							type="transfer"
							currency={toCurrency}
							label={FUND_GOAL_LABELS.received}
							emphasis="accent"
							disabled={loading}
							onChange={handleReceivedChange}
						/>
					) : null}
				</div>
				<PanelFooter
					submitType="submit"
					submitLabel={loading ? FUND_GOAL_LABELS.pending : FUND_GOAL_LABELS.submit}
					onClose={onClose}
					submitDisabled={!canSubmit}
				/>
			</TransactionEntryOnSubmit>
		</UiForm>
	);
};

FundGoalForm.displayName = 'FundGoalForm';

export { FundGoalForm };
export type { FundGoalFormProps };
