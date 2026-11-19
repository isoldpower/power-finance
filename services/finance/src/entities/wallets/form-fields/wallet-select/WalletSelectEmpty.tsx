import { Caption } from "@internal/shared";

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
