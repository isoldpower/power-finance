import type { ReactNode, FC } from "react";

import { Dialog, DialogTrigger, DialogContent, Button, Icons } from "@internal/ui-library";

interface OpenWalletCreationProps {
	children: ReactNode;
	isAddModalOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

const OpenWalletCreation: FC<OpenWalletCreationProps> = ({
	children,
	isAddModalOpen,
	onOpenChange
}) => {
	return (
		<Dialog open={isAddModalOpen} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<Button onClick={() => onOpenChange(true)}>
					<div className="flex items-center gap-2">
						<Icons.Plus size={16} />
						Add Wallet
					</div>
				</Button>
			</DialogTrigger>
			<DialogContent>
				{children}
			</DialogContent>
		</Dialog>
	)
}

OpenWalletCreation.displayName = 'OpenWalletCreation';

export { OpenWalletCreation };
export type { OpenWalletCreationProps };