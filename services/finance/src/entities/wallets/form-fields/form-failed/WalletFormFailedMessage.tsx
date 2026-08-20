import { Caption } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type WalletFormFailedMessageProps = PropsWithChildren;

const WalletFormFailedMessage: FC<WalletFormFailedMessageProps> = ({ children }) => (
	<Caption size="13">
		{children}
	</Caption>
);

WalletFormFailedMessage.displayName = 'WalletFormFailedMessage';

export { WalletFormFailedMessage };
export type { WalletFormFailedMessageProps };
