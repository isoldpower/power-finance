import type { FC } from "react";
import {useApiContext} from "@app/api";
import {useMutation, useQuery} from "@tanstack/react-query";
import {
	createWallet,
	CreateWalletRequest,
	listAllWallets,
} from "@feature/wallet";
import {List} from "@shared/components";
import {
	Button,
	Select,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem
} from "@internal/ui-library";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

interface OverviewWalletsListProps {

}

const OverviewWalletsList: FC<OverviewWalletsListProps> = () => {
	const apiContext = useApiContext();
	const wallets = useQuery({
		queryKey: ['wallets'],
		queryFn: () => listAllWallets({handler: apiContext.walletsClients.rest})
	});
	const createMutation = useMutation({
		mutationFn: (data: CreateWalletRequest['payload']) => createWallet({
			handler: apiContext.walletsClients.rest,
			payload: data
		}),
		onSettled: () => wallets.refetch()
	})

	const formSchema = z.object({
		currency: z.string().min(1, {message: 'Currency is required'}),
		name: z.string().min(1, {message: 'Name is required'}),
	})
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			currency: "",
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		createMutation.mutate({
			data: {
				name: values.name,
				currency: values.currency,
				balance: 0,
				reversed: false
			}
		});
	}

	return (
		<div className="flex flex-col gap-4">
			<h2 className="text-2xl">Overview Wallets List</h2>
			<div className="flex gap-2">
				{wallets.isLoading && <div>Loading...</div>}
				{wallets.isError && <div>Error: {wallets.error.message}</div>}
				{wallets.isSuccess && (wallets.data.data.length > 0
					? (
						<List>
							{wallets.data.data.map(wallet => (
								<h4>{wallet.name}</h4>
							))}
						</List>
					)
					: (
						<h4 className="text-lg text-neutral-500">
							The list of wallets is empty for now
						</h4>
					))}
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Card Title</FormLabel>
								<FormControl>
									<Input placeholder="shadcn" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div>
						<FormField
							control={form.control}
							name="currency"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a verified email to display" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{['USD', 'RUB', 'EUR'].map((currency) => (
												<SelectItem key={currency} value={currency}>
													{currency}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	)
}

OverviewWalletsList.displayName = 'OverviewWalletsList';

export { OverviewWalletsList };
export type { OverviewWalletsListProps };
