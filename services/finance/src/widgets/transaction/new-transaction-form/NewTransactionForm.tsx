import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, Button } from "@internal/ui-library";
import type { FC } from "react";

import { FieldLayout } from "@entity/transaction";
import {
	defaultValues,
	NewTransaction,
	transactionSchema,
} from "@feature/transaction";
import { SelectField, InputField } from "@shared/components";
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

  const walletsOptions = useMemo(() => {
		return wallets.map((wallet) => ({
			label: wallet.name,
			value: wallet.id
		}));
  }, [wallets]);

  return (
		<Form {...form}>
			<NewTransaction onSuccess={onClose} handleSubmit={form.handleSubmit}>
				<div className="space-y-4 py-4">
					<FormField
						control={form.control}
						name="source_wallet_id"
						render={({field}) => (
							<FieldLayout label="Source Wallet">
								<SelectField
									options={walletsOptions}
									{...field} />
							</FieldLayout>
						)} />
					<FormField
						control={form.control}
						name="amount"
						render={({field}) => (
							<FieldLayout label="Amount">
								<InputField placeholder="Enter amount" type="number" {...field} />
							</FieldLayout>
						)} />
					<FormField
						control={form.control}
						name="description"
						render={({field}) => (
							<FieldLayout label="Description">
								<InputField placeholder="Transaction note" type="text" {...field} />
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
