import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@internal/ui-library";
import {useState, useCallback, type ReactNode, FC} from "react";

import { EditWalletForm } from "@widget/wallet";
import type { Wallet } from "@entity/wallet";


interface EditWalletCardProps {
	wallet: Wallet;
	children: ReactNode;
}

const EditWalletModalProcess: FC<EditWalletCardProps> = ({
	wallet,
	children
}) => {
	const [isEditOpen, setIsEditOpen] = useState(false);

	const handleClose = useCallback(() => {
		setIsEditOpen(false);
	}, []);

	return (
		<Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
			<DialogTrigger asChild>
				{children}
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>
					Edit Wallet
				</DialogTitle>
				<EditWalletForm 
					wallet={wallet} 
					closeModal={handleClose}
				/>
			</DialogContent>
		</Dialog>
	);
}

export { EditWalletModalProcess };