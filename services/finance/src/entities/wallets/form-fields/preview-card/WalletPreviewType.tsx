import { Text } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type WalletPreviewTypeProps = PropsWithChildren;

const WalletPreviewType: FC<WalletPreviewTypeProps> = ({ children }) => (
	<Text size="xs" weight="semibold" tracking="0.04em">
		{children}
	</Text>
);

WalletPreviewType.displayName = 'WalletPreviewType';

export { WalletPreviewType };
export type { WalletPreviewTypeProps };
