import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogHeader
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
		<Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
			<DialogTrigger asChild>
				{children}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Are you sure you want to delete this wallet?
					</DialogTitle>
					<DialogDescription>
						This action cannot be undone.
					</DialogDescription>
				</DialogHeader>
				<DeleteWalletForm
					wallet={wallet}
					closeModal={handleClose}
				/>
			</DialogContent>
		</Dialog>
	);
}

export { DeleteWalletModalProcess };