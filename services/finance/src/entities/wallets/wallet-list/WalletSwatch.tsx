import type { FC } from "react";

interface WalletSwatchProps {
	gradient: string;
}

const WalletSwatch: FC<WalletSwatchProps> = ({ gradient }) => (
	<div className="h-[26px] w-[38px] flex-none rounded-[6px]" style={{ background: gradient }} />
);

WalletSwatch.displayName = 'WalletSwatch';

export { WalletSwatch };
export type { WalletSwatchProps };
