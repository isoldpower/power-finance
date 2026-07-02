import type { FC } from "react";

interface WalletTxnIconProps {
	icon: string;
	iconClass: string;
}

const WalletTxnIcon: FC<WalletTxnIconProps> = ({ icon, iconClass }) => (
	<div className={`flex size-[30px] flex-none items-center justify-center rounded-[8px] ${iconClass}`}>{icon}</div>
);

WalletTxnIcon.displayName = 'WalletTxnIcon';

export { WalletTxnIcon };
export type { WalletTxnIconProps };
