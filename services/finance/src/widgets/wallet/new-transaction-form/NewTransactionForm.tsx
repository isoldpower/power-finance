import {FC, useMemo} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@internal/ui-library";
import {NewTransaction} from "@feature/wallet/transaction-actions/NewTransaction.tsx";
import {InputField} from "@shared/components/form-helpers/InputField.tsx";
import {Button} from "@internal/ui-library";
import {defaultValues, formSchema, FormSchema, TRANSACTION_TYPES} from "./schema.ts";
import {SingleToggleField} from "@shared/components/form-helpers/SingleToggleField.tsx";
import {SelectField} from "@shared/components/form-helpers/SelectField.tsx";
import { useWalletsList } from "@feature/wallet";
import {ShowOnValue} from "@shared/components/form-helpers/ShowOnValue.tsx";
import {FieldLayout} from "@entity/wallet/transaction-fields/FieldLayout.tsx";


interface NewTransactionFormProps {
	onClose: () => void;
}

const NewTransactionForm: FC<NewTransactionFormProps> = ({ onClose }) => {
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues
	});
	const fromWallet = form.watch('from');
	const toWallet = form.watch('to');

	const { wallets } = useWalletsList();
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
						name="type"
						render={({ field }) => (
							<FieldLayout label="Transaction Type">
								<SingleToggleField options={TRANSACTION_TYPES} {...field} />
							</FieldLayout>
						)} />
					<FormField
						control={form.control}
						name="amount"
						render={({ field }) => (
							<FieldLayout label="Amount">
								<InputField placeholder="Enter transfer value" type="number" {...field} />
							</FieldLayout>
						)} />
					<FormField
						control={form.control}
						name="from"
						render={({ field }) => (
							<FieldLayout label="From Account">
								<SelectField
									excluded={[toWallet || '']}
									options={walletsOptions}
									{...field} />
							</FieldLayout>
						)} />
					<ShowOnValue form={form} value="type" targetValue="transfer" dependentValues={['to']}>
						<FormField
							control={form.control}
							name="to"
							render={({ field }) => (
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
						render={({ field }) => (
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
