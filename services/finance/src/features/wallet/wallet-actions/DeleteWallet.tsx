import type { ComponentProps, FC } from "react";
import { useCallback, useState } from "react";
import {
	Button,
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@internal/ui-library";

import { useWalletMethods } from "@feature/wallet";
import type { Wallet } from "@entity/wallet";


interface DeleteWalletProps extends Omit<ComponentProps<typeof Button>, 'onClick'> {
	wallet: Wallet;
}

const DeleteWallet: FC<DeleteWalletProps> = ({ children, wallet, ...props }) => {
	const [open, setOpen] = useState(false);
	const { deleteWallet } = useWalletMethods(wallet.id);
	const handleDelete = useCallback(() => {
		deleteWallet();
		setOpen(false);
	}, []);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					type="button"
					{...props}
				>
					{children}
				</Button>
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
				<DialogFooter>
					<div className="flex justify-end gap-2 mt-4">
						<Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
						<Button variant="destructive" onClick={handleDelete}>Delete</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

DeleteWallet.displayName = 'DeleteWallet';

export { DeleteWallet };