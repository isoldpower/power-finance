import {
	UiDialog,
	UiDialogTrigger,
	UiDialogContent,
	UiDialogTitle,
	UiDialogDescription,
	UiDialogHeader
} from "@internal/ui-library";
import {useState, useCallback, type ReactNode, FC} from "react";

import { DeleteWalletForm } from "@widget/wallet";
import type { Wallet } from "@entity/wallet";


interface DeleteWalletCardProps {
	wallet: Wallet;
	children: ReactNode;
}

const DeleteWalletModalProcess: FC<DeleteWalletCardProps> = ({
	wallet,
	children
}) => {
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);

	const handleClose = useCallback(() => {
		setIsDeleteOpen(false);
	}, []);

	return (
		<UiDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
			<UiDialogTrigger asChild>
				{children}
			</UiDialogTrigger>
			<UiDialogContent>
				<UiDialogHeader>
					<UiDialogTitle>
						Are you sure you want to delete this wallet?
					</UiDialogTitle>
					<UiDialogDescription>
						This action cannot be undone.
					</UiDialogDescription>
				</UiDialogHeader>
				<DeleteWalletForm
					wallet={wallet}
					closeModal={handleClose}
				/>
			</UiDialogContent>
		</UiDialog>
	);
}

export { DeleteWalletModalProcess };