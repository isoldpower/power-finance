import type { ReactNode, FC } from "react";

import { UiDialog, UiDialogTrigger, UiDialogContent, UiButton, Icons } from "@internal/ui-library";

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
		<UiDialog open={isAddModalOpen} onOpenChange={onOpenChange}>
			<UiDialogTrigger asChild>
				<UiButton onClick={() => { onOpenChange(true); }}>
					<div className="flex items-center gap-2">
						<Icons.Plus size={16} />
						Add Wallet
					</div>
				</UiButton>
			</UiDialogTrigger>
			<UiDialogContent>
				{children}
			</UiDialogContent>
		</UiDialog>
	)
}

OpenWalletCreation.displayName = 'OpenWalletCreation';

export { OpenWalletCreation };
export type { OpenWalletCreationProps };