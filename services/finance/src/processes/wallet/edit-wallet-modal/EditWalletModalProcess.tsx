import { UiDialog, UiDialogTrigger, UiDialogContent, UiDialogTitle } from "@internal/ui-library";
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
		<UiDialog open={isEditOpen} onOpenChange={setIsEditOpen}>
			<UiDialogTrigger asChild>
				{children}
			</UiDialogTrigger>
			<UiDialogContent>
				<UiDialogTitle>
					Edit Wallet
				</UiDialogTitle>
				<EditWalletForm 
					wallet={wallet} 
					closeModal={handleClose}
				/>
			</UiDialogContent>
		</UiDialog>
	);
}

export { EditWalletModalProcess };