import { MetaText } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type WalletPreviewCurrencyProps = PropsWithChildren;

const WalletPreviewCurrency: FC<WalletPreviewCurrencyProps> = ({ children }) => (
	<MetaText tone="default" className="opacity-85">
		{children}
	</MetaText>
);

WalletPreviewCurrency.displayName = 'WalletPreviewCurrency';

export { WalletPreviewCurrency };
export type { WalletPreviewCurrencyProps };
