import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { codes, code } from 'currency-codes';
import { Button, Form, FormField } from "@internal/ui-library";
import type { FC } from "react";

import { FieldLayout, WALLET_TYPES } from "@entity/wallet";
import { NewWallet } from "@feature/wallet";
import { SelectField, InputField, SingleToggleField } from "@shared/components";
import { walletSchema, useNewDefaultValues } from "@feature/wallet";
import type { WalletSchema } from "@feature/wallet";


interface NewWalletFormProps {
	onClose: () => void;
}

const NewWalletForm: FC<NewWalletFormProps> = ({ onClose }) => {
	const defaults = useNewDefaultValues();
	const form = useForm<WalletSchema>({
		resolver: zodResolver(walletSchema),
		defaultValues: defaults
	});

	return (
		<Form {...form}>
			<NewWallet onSuccess={onClose} handleSubmit={form.handleSubmit}>
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
							<FieldLayout label="Currency">
								<SelectField
									placeholder="Select currency"
									options={codes().map((item) => ({
										label: `${code(item)?.currency ?? item} (${item})`,
										value: item
									}))}
									{...field} />
							</FieldLayout>
						)} />
					<FormField
						control={form.control}
						name="type"
						render={({ field }) => (
							<FieldLayout label="Account Type">
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

NewWalletForm.displayName = 'NewWalletForm';

export { NewWalletForm };