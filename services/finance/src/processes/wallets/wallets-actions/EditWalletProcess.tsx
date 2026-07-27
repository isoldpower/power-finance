import type { FC } from "react";

import { useSlideOverContext } from "@shared/components/slide-over/context/use-context-value.ts";
import { useWallet } from "@feature/wallets";
import { z } from "zod";
import { useSearchProtected } from "@feature/navigation";
import { EditWalletDetailsFx } from "@feature/wallets/fetch-experience/EditWalletDetailsFx.tsx";
import { EditWalletForm } from "@widget/wallets";


const requiredSearch = z.object({
	wallet: z.string().min(1)
});

type RequiredSearchTypes = z.infer<typeof requiredSearch>;

const EditWalletProcess: FC = () => {
	const [{ wallet }] = useSearchProtected<RequiredSearchTypes>(requiredSearch);
	const { isPending, isError, wallet: fetchedWallet } = useWallet(wallet);
	const { onClose } = useSlideOverContext();
	
	return (
		<EditWalletDetailsFx wallet={fetchedWallet} isError={isError} isPending={isPending}>
			{(loadedWallet) => (
				<EditWalletForm
					wallet={{
						...loadedWallet,
						gradient: loadedWallet.color,
						currency: loadedWallet.balance.currency,
					}}
					onClose={onClose}
				/>
			)}
		</EditWalletDetailsFx>
	);
};

EditWalletProcess.displayName = 'EditWalletProcess';

export { EditWalletProcess };