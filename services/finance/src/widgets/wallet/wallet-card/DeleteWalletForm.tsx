import {UiButton, UiForm, UiFormField} from "@internal/ui-library";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";

import {deleteWalletSchema, DeleteWallet, useDeleteDefaultValues } from "@feature/wallet";
import type { DeleteWalletSchema } from "@feature/wallet";
import {FieldLayout, Wallet} from "@entity/wallet";
import {InputField} from "@shared/components";


interface DeleteWalletFormProps {
	wallet: Wallet;
	closeModal: () => void;
}

const DeleteWalletForm: FC<DeleteWalletFormProps> = ({
	wallet,
	closeModal
}) => {
	const defaults = useDeleteDefaultValues(wallet);
	const form = useForm<DeleteWalletSchema>({
		resolver: zodResolver(deleteWalletSchema),
		defaultValues: defaults
	});

	return (
		<UiForm {...form}>
			<DeleteWallet form={form} wallet={wallet} onSuccess={closeModal}>
				<div className='space-y-4'>
					<UiFormField
						control={form.control}
						name="id"
						render={({ field }) => (
							<FieldLayout label='Target ID'>
								<InputField disabled placeholder='Ooops...' {...field} />
							</FieldLayout>
						)} />
					<div className="flex justify-end gap-2">
						<UiButton variant="secondary" type="button" onClick={closeModal}>
							Cancel
						</UiButton>
						<UiButton variant="destructive" type="submit">
							Delete
						</UiButton>
					</div>
				</div>
			</DeleteWallet>
		</UiForm>
	);
}

export { DeleteWalletForm };