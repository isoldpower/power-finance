import type { ComponentProps, FC } from "react";
import type { Wallet } from "@entity/wallet";

import { useCallback } from "react";
import { Button } from "@internal/ui-library";

interface EditWalletProps extends Omit<ComponentProps<typeof Button>, 'onClick'> {
	wallet: Wallet;
}

const EditWallet: FC<EditWalletProps> = ({ children, wallet, ...props }) => {
	const handleEdit = useCallback(() => {
		console.log(`Edit wallet ${wallet.id}`);
	}, []);

	return (
		<Button
			type="button"
			onClick={handleEdit}
			{...props}
		>
			{children}
		</Button>
	)
}

EditWallet.displayName = 'EditWallet';

export { EditWallet };