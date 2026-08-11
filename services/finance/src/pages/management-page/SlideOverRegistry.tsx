import type { ReactNode } from "react";

import {
	ScanReceiptProcess,
	CreateTransactionProcess,
} from "@process/transactions";
import {
	CreateWalletProcess,
	EditWalletProcess,
} from "@process/wallets";


const managementSlides = {
	scanReceipt: 'scan-receipt',
	createTransaction: 'create-transaction',
	createWallet: 'create-wallet',
	editWallet: 'edit-wallet'
} as const;

type SlideOverPanelType = typeof managementSlides[keyof typeof managementSlides];

const managementSlidesRegistry: Record<SlideOverPanelType, ReactNode> = {
	[managementSlides.scanReceipt]: <ScanReceiptProcess/>,
	[managementSlides.createTransaction]: <CreateTransactionProcess scanPanelId={managementSlides.scanReceipt} />,
	[managementSlides.createWallet]: <CreateWalletProcess/>,
	[managementSlides.editWallet]: <EditWalletProcess/>
}


export {managementSlidesRegistry, managementSlides};
export type { SlideOverPanelType };
