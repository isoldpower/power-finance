import { Button, Form, FormField } from "@internal/ui-library";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearch } from "@tanstack/react-router";
import { z } from "zod";
import type { FC } from "react";

import { filterDefaultValues, transactionFiltersSchema, ApplyQueryFilters } from "@feature/transaction";
import { FieldLayout } from "@entity/transaction";
import { SelectField } from "@shared/components";
import type { Wallet } from "@entity/wallet";


interface TransactionFiltersModalProps {
	wallets: Wallet[];
	onClose: () => void;
}

const TransactionFiltersModal: FC<TransactionFiltersModalProps> = ({
	onClose,
	wallets
}) => {
	const searchParams: unknown = useSearch({ strict: false });
	const { selectedWallet } = z.object({
		selectedWallet: z.string()
	}).catch({ selectedWallet: 'all' }).parse(searchParams);

	const form = useForm({
		resolver: zodResolver(transactionFiltersSchema),
		defaultValues: Object.assign(filterDefaultValues, {
			selectedWallet: selectedWallet
		})
	});

	return (
		<Form {...form}>
			<ApplyQueryFilters handleSubmit={form.handleSubmit} wallets={wallets} onSuccess={onClose}>
				<div className="space-y-4">
					<FormField
						control={form.control}
						name="selectedWallet"
						render={({field}) => (
							<FieldLayout label="Target Wallet">
								<SelectField
									options={[
										{ label: 'All Wallets', value: 'all' },
										...wallets.map((wallet) => ({ label: wallet.name, value: wallet.id}))
									]}
									{...field} />
							</FieldLayout>
						)} />
					<div className="pt-4 flex space-x-3">
						<Button variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit">
							Apply Filters
						</Button>
					</div>
				</div>
			</ApplyQueryFilters>
		</Form>
	)
}

export { TransactionFiltersModal };
export type { TransactionFiltersModalProps };