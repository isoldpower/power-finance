import { z } from "zod";
import { EditWalletForm } from "@widget/wallets";
import { useWallet, EditWalletDetailsFx, WalletCurrenciesFx } from "@feature/wallets";
import { useCurrencies } from "@feature/localization";
import { useSearchProtected } from "@feature/navigation";
import { SlideOver, useSlideOverContext } from "@shared/components";

import type { FC } from "react";


const requiredSearch = z.object({
	wallet: z.string().min(1)
});

type RequiredSearchTypes = z.infer<typeof requiredSearch>;

const EditWalletProcess: FC = () => {
	const [{ wallet }] = useSearchProtected<RequiredSearchTypes>(requiredSearch);
	const { isPending, isError, wallet: fetchedWallet } = useWallet(wallet);
	const currenciesQuery = useCurrencies();
	const { onClose } = useSlideOverContext();

	return (
		<>
			<SlideOver.Heading>
				<SlideOver.Title>
					Edit wallet
				</SlideOver.Title>
				<SlideOver.Collapse>
					✕
				</SlideOver.Collapse>
			</SlideOver.Heading>
			<EditWalletDetailsFx wallet={fetchedWallet} isError={isError} isPending={isPending}>
				{(loadedWallet) => (
					<WalletCurrenciesFx
						currencies={currenciesQuery.currencies}
						isError={currenciesQuery.isError}
						isPending={currenciesQuery.isPending}
					>
						{(currencies) => (
							<EditWalletForm
								wallet={{
									...loadedWallet,
									gradient: loadedWallet.color,
									currency: loadedWallet.balance.currency,
								}}
								currencies={currencies}
								onClose={onClose}
							/>
						)}
					</WalletCurrenciesFx>
				)}
			</EditWalletDetailsFx>
		</>
	);
};

EditWalletProcess.displayName = 'EditWalletProcess';

export { EditWalletProcess };
