import { useWalletKinds } from "../data-presenters";

import type { FC, ReactNode } from "react";
import type { WalletKind } from "@entity/wallets";


interface WalletKindsFxProps {
	children: ((kinds: WalletKind[]) => ReactNode) | ReactNode;
}

const WalletKindsFx: FC<WalletKindsFxProps> = ({ children }) => {
	const { kinds, isPending, isError } = useWalletKinds();

	if (isPending) {
		return (
			<div>Getting everything ready...</div>
		);
	} else if (isError || kinds.length === 0) {
		return (
			<div>Ooops, something went wrong :(</div>
		);
	}

	return typeof children === 'function'
		? children(kinds)
		: children;
}

export { WalletKindsFx };
export type { WalletKindsFxProps };
