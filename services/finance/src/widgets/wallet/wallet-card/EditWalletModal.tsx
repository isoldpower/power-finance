import { Button, Dialog, DialogTrigger, DialogContent, Form, FormField, DialogTitle } from "@internal/ui-library";
import { useState } from "react";
import type { FC, ReactNode } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editSchema, EditWallet } from "@feature/wallet";
import type { EditSchema } from "@feature/wallet";
import { FieldLayout, Wallet } from "@entity/wallet";
import {InputField, SelectField, SingleToggleField} from "@shared/components";
import {code, codes} from "currency-codes";
import { WALLET_TYPES } from "@widget/wallet/wallet-creation-modal/schema.ts";
import {useEditDefaultValues} from "@feature/wallet/wallet-actions/EditWallet.tsx";


interface EditWalletCardProps {
	wallet: Wallet;
	children: ReactNode;
}

const EditWalletModal: FC<EditWalletCardProps> = ({
	wallet,
	children
}) => {
	const [isEditOpen, setIsEditOpen] = useState(false);
	const defaults = useEditDefaultValues(wallet);
	const form = useForm<EditSchema>({
		resolver: zodResolver(editSchema),
		defaultValues: defaults
	});

	return (
		<Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
			<DialogTrigger asChild>
				<Button type="button" variant="ghost" size="sm" color="neutral" onClick={() => setIsEditOpen(true)}>
					{children}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>
					Edit Wallet
				</DialogTitle>
				<Form {...form}>
					<EditWallet form={form} wallet={wallet}>
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
							<Button variant="outline" type="button" onClick={() => setIsEditOpen(false)}>
								Cancel
							</Button>
							<Button variant="default" type="submit">
								Update Wallet
							</Button>
						</div>
					</EditWallet>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

export { EditWalletModal };