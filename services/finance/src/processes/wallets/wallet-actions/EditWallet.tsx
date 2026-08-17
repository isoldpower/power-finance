import { EditWalletForm } from "@widget/wallets";
import {
	EditWalletDetailsFx,
	useWallet,
	useWalletsSelection,
} from "@feature/wallets";
import { SlideOver } from "@shared/overlays";
import { useSlideOverContext } from "@shared/overlays";

import type { FC } from "react";


const EditWallet: FC = () => {
	const selectedWalletId = useWalletsSelection((state) => state.selectedWalletId);
	const { isPending, isError, wallet: fetchedWallet } = useWallet(selectedWalletId ?? 'none', {
		enabled: selectedWalletId !== null,
	});
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
					<EditWalletForm
						wallet={{
							...loadedWallet,
							gradient: loadedWallet.color,
						}}
						onClose={onClose}
					/>
				)}
			</EditWalletDetailsFx>
		</>
	);
};

EditWallet.displayName = 'EditWallet';

export { EditWallet };
