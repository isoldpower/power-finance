import { Button, Dialog, DialogTrigger, DialogContent, Form, FormField, DialogTitle } from "@internal/ui-library";
import { useState, useCallback } from "react";
import { code, codes } from "currency-codes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FC, ReactNode } from "react";

import { walletSchema, EditWallet, useEditDefaultValues } from "@feature/wallet";
import { FieldLayout, WALLET_TYPES } from "@entity/wallet";
import { InputField, SelectField, SingleToggleField } from "@shared/components";
import type { WalletSchema } from "@feature/wallet";
import type { Wallet } from "@entity/wallet";


const CURRENCY_OPTIONS = codes().map((item) => ({
  label: `${code(item)?.currency ?? item} (${item})`,
  value: item
}));

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
  const form = useForm<WalletSchema>({
    resolver: zodResolver(walletSchema),
    defaultValues: defaults
  });

  const handleOpen = useCallback(() => {
    setIsEditOpen(true);
  }, []);
  
  const handleClose = useCallback(() => {
    setIsEditOpen(false);
  }, []);

  return (
    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
		<DialogTrigger asChild>
			<Button 
				type="button" 
				variant="ghost" 
				size="sm" 
				color="neutral" 
				onClick={handleOpen}
			>
				{children}
			</Button>
		</DialogTrigger>
		<DialogContent>
			<DialogTitle>
				Edit Wallet
			</DialogTitle>
			<Form {...form}>
				<EditWallet form={form} wallet={wallet} onSuccess={handleClose}>
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
							name="currency"
							render={({ field }) => (
								<FieldLayout label="Currency">
									<SelectField
										placeholder="Select currency"
										options={CURRENCY_OPTIONS}
										{...field} />
								</FieldLayout>
							)} />
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
							<FieldLayout label="Account Type">
								<SingleToggleField 
									options={WALLET_TYPES.map((walletType) => ({
										value: walletType,
										label: `${walletType.charAt(0).toUpperCase()}${walletType.slice(1)} Account`
									}))}
									{...field} />
							</FieldLayout>
						)} />
					</div>
					<div className="flex items-center gap-2 pt-4">
						<Button variant="outline" type="button" onClick={handleClose}>
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