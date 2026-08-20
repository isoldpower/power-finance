import { Heading } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type WalletPreviewNameProps = PropsWithChildren;

const WalletPreviewName: FC<WalletPreviewNameProps> = ({ children }) => (
	<Heading as="div" size="19" tone="inverted">
		{children}
	</Heading>
);

WalletPreviewName.displayName = 'WalletPreviewName';

export { WalletPreviewName };
export type { WalletPreviewNameProps };
