import { Text } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type WalletSelectOptionNameProps = PropsWithChildren;

const WalletSelectOptionName: FC<WalletSelectOptionNameProps> = ({ children }) => (
	<Text weight="semibold" truncate className="min-w-0 flex-1">
		{children}
	</Text>
);

WalletSelectOptionName.displayName = 'WalletSelectOptionName';

export { WalletSelectOptionName };
export type { WalletSelectOptionNameProps };
