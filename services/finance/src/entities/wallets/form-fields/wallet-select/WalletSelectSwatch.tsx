import type { FC } from "react";


interface WalletSelectSwatchProps {
	gradient: string;
}

const WalletSelectSwatch: FC<WalletSelectSwatchProps> = ({ gradient }) => (
	<span
		className="h-[18px] w-[26px] flex-none rounded-[4px]"
		style={{ background: gradient }}
	/>
);

WalletSelectSwatch.displayName = 'WalletSelectSwatch';

export { WalletSelectSwatch };
export type { WalletSelectSwatchProps };
