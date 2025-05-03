import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { code, codes } from "currency-codes";
import { Form, FormField, Button } from "@internal/ui-library";
import type { FC } from "react";

import { FieldLayout } from "@entity/transaction";
import {
	defaultValues,
	NewTransaction,
	transactionSchema,
	TRANSACTION_TYPES,
	useTargetCurrency
} from "@feature/transaction";
import { ShowOnValue, SingleToggleField, SelectField, InputField } from "@shared/components";
import type { TransactionSchema } from "@feature/transaction";
import type { Wallet } from "@entity/wallet";


interface NewTransactionFormProps {
	wallets: Wallet[];
  onClose: () => void;
}

const NewTransactionForm: FC<NewTransactionFormProps> = ({ onClose, wallets }) => {
  const form = useForm<TransactionSchema>({
		resolver: zodResolver(transactionSchema),
		defaultValues
  });
	useTargetCurrency(form);

  const fromWallet = form.watch('from');
  const toWallet = form.watch('to');

  const walletsOptions = useMemo(() => {
		return wallets.map((wallet) => ({
			label: wallet.name,
			value: wallet.id
		}));
  }, [wallets]);

  return (
		<Form {...form}>
			<NewTransaction onSuccess={onClose} handleSubmit={form.handleSubmit} wallets={wallets}>
				<div className="space-y-4 py-4">
					<FormField
						control={form.control}
						name="type"
						render={({field}) => (
							<FieldLayout label="Transaction Type">
								<SingleToggleField options={TRANSACTION_TYPES} {...field} />
							</FieldLayout>
						)} />
					<div className="flex gap-2">
						<FormField
							control={form.control}
							name="amount"
							render={({field}) => (
								<FieldLayout className="grow basis-2/3 w-2/3" label="Amount">
									<InputField placeholder="Enter transfer value" type="number" {...field} />
								</FieldLayout>
							)} />
						<FormField
							control={form.control}
							name="targetCurrency"
							render={({field}) => (
								<FieldLayout className="grow basis-1/3 max-w-1/3 overflow-hidden" label="Currency">
									<SelectField
										placeholder="Select currency"
										options={codes().map((item) => ({
											label: `${code(item)?.currency || item} (${item})`,
											value: item
										}))}
										{...field} />
								</FieldLayout>
							)} />
					</div>
					<ShowOnValue form={form} value="type" targetValue={["transfer", "expense"]}>
						<FormField
							control={form.control}
							name="from"
							render={({field}) => (
								<FieldLayout label="From Account">
									<SelectField
										excluded={[toWallet || '']}
										options={walletsOptions}
										{...field} />
								</FieldLayout>
							)} />
					</ShowOnValue>
					<ShowOnValue
						form={form}
						value="type"
						targetValue={["transfer", "income", "adjust"]}
						dependentValues={['to']}
					>
						<FormField
							control={form.control}
							name="to"
							render={({field}) => (
								<FieldLayout label="To Account">
									<SelectField
									excluded={[fromWallet || '']}
									options={walletsOptions}
									{...field} />
								</FieldLayout>
							)} />
					</ShowOnValue>
					<FormField
						control={form.control}
						name="description"
						render={({field}) => (
							<FieldLayout label="Description">
								<InputField placeholder="Transaction hint" type="text" {...field} />
							</FieldLayout>
						)} />
				</div>
				<div className="flex items-center gap-2 pt-4">
					<Button variant="outline" type="button" onClick={onClose}>
						Cancel
					</Button>
					<Button variant="default" type="submit">
						Create Transaction
					</Button>
				</div>
			</NewTransaction>
		</Form>
  )
}

NewTransactionForm.displayName = 'NewTransaction';

export { NewTransactionForm };
