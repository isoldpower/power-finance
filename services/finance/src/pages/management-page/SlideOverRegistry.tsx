import { ScanReceipt, CreateTransaction } from "@process/transactions";
import { CreateWallet, EditWallet } from "@process/wallets";

import type { ReactNode } from "react";


const managementSlides = {
	scanReceipt: 'scan-receipt',
	createTransaction: 'create-transaction',
	createWallet: 'create-wallet',
	editWallet: 'edit-wallet'
} as const;

type SlideOverPanelType = typeof managementSlides[keyof typeof managementSlides];

const managementSlidesRegistry: Record<SlideOverPanelType, ReactNode> = {
	[managementSlides.scanReceipt]: <ScanReceipt/>,
	[managementSlides.createTransaction]: <CreateTransaction scanPanelId={managementSlides.scanReceipt} />,
	[managementSlides.createWallet]: <CreateWallet/>,
	[managementSlides.editWallet]: <EditWallet/>
}


export {managementSlidesRegistry, managementSlides};
export type { SlideOverPanelType };
