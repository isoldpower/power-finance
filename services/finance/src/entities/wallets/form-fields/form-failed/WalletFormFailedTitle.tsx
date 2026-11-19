import { RowTitle } from "@internal/shared";

import type { FC, PropsWithChildren } from "react";


type WalletFormFailedTitleProps = PropsWithChildren;

const WalletFormFailedTitle: FC<WalletFormFailedTitleProps> = ({ children }) => (
	<RowTitle as="p" size="13.5" tone="negative">
		{children}
	</RowTitle>
);

WalletFormFailedTitle.displayName = 'WalletFormFailedTitle';

export { WalletFormFailedTitle };
export type { WalletFormFailedTitleProps };
