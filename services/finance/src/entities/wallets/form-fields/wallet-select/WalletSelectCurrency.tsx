import { MetaText } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type WalletSelectCurrencyProps = PropsWithChildren<{
	size?: '10.5';
}>;

const WalletSelectCurrency: FC<WalletSelectCurrencyProps> = ({ children, size }) => (
	<MetaText size={size}>
		{children}
	</MetaText>
);

WalletSelectCurrency.displayName = 'WalletSelectCurrency';

export { WalletSelectCurrency };
export type { WalletSelectCurrencyProps };
