import { Caption } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type WalletSelectEmptyProps = PropsWithChildren;

const WalletSelectEmpty: FC<WalletSelectEmptyProps> = ({ children }) => (
	<Caption className="px-3 py-2">
		{children}
	</Caption>
);

WalletSelectEmpty.displayName = 'WalletSelectEmpty';

export { WalletSelectEmpty };
export type { WalletSelectEmptyProps };
