import {FC} from "react";
import {useForm} from "react-hook-form";
import {FormSchema, WALLET_TYPES} from "./schema.ts";
import { defaultValues, formSchema } from "./schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import { codes, code } from 'currency-codes';

import {FieldLayout} from "@entity/wallet/transaction-fields/FieldLayout.tsx";
import {SingleToggleField} from "@shared/components/form-helpers/SingleToggleField.tsx";
import {InputField} from "@shared/components/form-helpers/InputField.tsx";
import {SelectField} from "@shared/components/form-helpers/SelectField.tsx";
import {Button, Form, FormField } from "@internal/ui-library";
import {NewWallet} from "@feature/wallet/new-wallet/NewWallet.tsx";

interface WalletCreationModalProps {
	onClose: () => void;
}

const WalletCreationModal: FC<WalletCreationModalProps> = ({ onClose }) => {
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues
	});

	return (
		<Form {...form}>
			<NewWallet
				onSuccess={onClose}
				mutate={(values) => ({
					name: values.name,
					balance: Number(values.balance),
					currency: values.currency,
					reversed: values.type === 'credit'
				})}
				handleSubmit={form.handleSubmit}
			>
				<div className="space-y-4 py-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FieldLayout label="Wallet Name">
								<InputField placeholder="e.g., Main Account" {...field} />
							</FieldLayout>
						)} />
					<FormField
						control={form.control}
						name="balance"
						render={({ field }) => (
							<FieldLayout label="Initial Balance">
								<InputField placeholder="Enter transfer value" type="number" {...field} />
							</FieldLayout>
						)} />
					<FormField
						control={form.control}
						name="currency"
						render={({ field }) => (
							<FieldLayout label="From Account">
								<SelectField
									options={codes().map((item) => ({
										label: `${code(item)?.currency || item} (${item})`,
										value: item
									}))}
									{...field} />
							</FieldLayout>
						)} />
					<FormField
						control={form.control}
						name="type"
						render={({ field }) => (
							<FieldLayout label="To Account">
								<SingleToggleField options={WALLET_TYPES.map((walletType) => ({
									value: walletType,
									label: `${walletType.charAt(0).toUpperCase()}${walletType.slice(1)} Account`
								}))}
								{...field} />
							</FieldLayout>
						)} />
				</div>
				<div className="flex items-center gap-2 pt-4">
					<Button variant="outline" type="button" onClick={onClose}>
						Cancel
					</Button>
					<Button variant="default" type="submit">
						Create Wallet
					</Button>
				</div>
			</NewWallet>
		</Form>
	);
}

WalletCreationModal.displayName = 'WalletCreationModal';

export { WalletCreationModal };