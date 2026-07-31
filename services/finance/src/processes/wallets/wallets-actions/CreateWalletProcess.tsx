import { SlideOver, useSlideOverContext } from "@shared/components";
import { CreateWalletForm } from "@widget/wallets";
import { useCurrencies } from "@feature/localization";
import { WalletCurrenciesFx } from "@feature/wallets";

import type { FC } from "react";


const CreateWalletProcess: FC = () => {
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

CreateWalletProcess.displayName = 'CreateWalletProcess';

export { CreateWalletProcess };
