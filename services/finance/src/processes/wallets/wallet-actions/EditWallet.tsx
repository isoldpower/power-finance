import { useShallow } from "zustand/react/shallow";
import { EditWalletForm } from "@widget/wallets";
import { toPanelWallet } from "@entity/wallets";
import {
	EditWalletDetailsFx,
	useWallet,
	useWalletsSelection,
} from "@feature/wallets";
import { SlideOver } from "@shared/overlays";
import { useSlideOverContext } from "@shared/overlays";

import type { FC } from "react";


const EditWallet: FC = () => {
	const { selectedWalletId, selectionConfirmed } = useWalletsSelection(
		useShallow((state) => ({
			selectedWalletId: state.selectedWalletId,
			selectionConfirmed: state.selectionConfirmed,
		}))
	);
	const { isPending, isError, wallet: fetchedWallet } = useWallet(selectedWalletId ?? 'none', {
		enabled: selectedWalletId !== null && selectionConfirmed,
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
						wallet={toPanelWallet(loadedWallet)}
						onClose={onClose}
					/>
				)}
			</EditWalletDetailsFx>
		</>
	);
};

EditWallet.displayName = 'EditWallet';

export { EditWallet };
