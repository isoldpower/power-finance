import { SlideOver } from "@shared/overlays";
import { useSlideOverContext } from "@shared/overlays";
import { CreateWalletForm } from "@widget/wallets";
import { useCurrencies } from "@feature/localization";
import { WalletCurrenciesFx } from "@feature/wallets";

import type { FC } from "react";


const CreateWallet: FC = () => {
	const { onClose } = useSlideOverContext();
	const { currencies, isPending, isError } = useCurrencies();

	return (
		<>
			<SlideOver.Heading>
				<SlideOver.Title>
					New wallet
				</SlideOver.Title>
				<SlideOver.Collapse>
					✕
				</SlideOver.Collapse>
			</SlideOver.Heading>
			<WalletCurrenciesFx currencies={currencies} isError={isError} isPending={isPending}>
				{(currencies) => (
					<CreateWalletForm
						currencies={currencies}
						onClose={onClose}
					/>
				)}
			</WalletCurrenciesFx>
		</>
	);
}

CreateWallet.displayName = 'CreateWallet';

export { CreateWallet };
