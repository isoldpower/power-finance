import { EditWalletForm } from "@widget/wallets";
import {
	EditWalletDetailsFx,
	useWallet,
	useWalletsSelection,
	WalletCurrenciesFx,
} from "@feature/wallets";
import { useCurrencies } from "@feature/localization";
import { SlideOver } from "@shared/overlays";
import { useSlideOverContext } from "@shared/overlays";

import type { FC } from "react";


const EditWallet: FC = () => {
	const selectedWalletId = useWalletsSelection((state) => state.selectedWalletId);
	const { isPending, isError, wallet: fetchedWallet } = useWallet(selectedWalletId ?? 'none', {
		enabled: selectedWalletId !== null,
	});
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

EditWallet.displayName = 'EditWallet';

export { EditWallet };
