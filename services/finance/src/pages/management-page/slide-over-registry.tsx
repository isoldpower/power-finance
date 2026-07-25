import type { ReactNode } from "react";
import { ScanReceiptProcess } from "@process/transactions/scan-receipt";
import { CreateTransactionProcess } from "@process/transactions/add-transaction";
import { CreateWalletProcess } from "@process/wallets/wallets-actions";
import { EditWalletProcess } from "@process/wallets/wallets-actions/EditWalletProcess.tsx";


const managementSlides = {
	scanReceipt: 'scan-receipt', 
	createTransaction: 'create-transaction',
	createWallet: 'create-wallet',
	editWallet: 'edit-wallet'
};

type SlideOverPanelType<T = typeof managementSlides> = T[keyof T];

const managementSlidesRegistry: Record<SlideOverPanelType, ReactNode> = {
	[managementSlides.scanReceipt]: <ScanReceiptProcess />,
	[managementSlides.createTransaction]: <CreateTransactionProcess />,
	[managementSlides.createWallet]: <CreateWalletProcess />,
	[managementSlides.editWallet]: <EditWalletProcess />
}


export { managementSlidesRegistry, managementSlides };