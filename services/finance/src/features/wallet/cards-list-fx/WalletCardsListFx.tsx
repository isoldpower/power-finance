import type { ReactNode, FC } from "react";

interface WalletCardsListFxProps {
	pending: ReactNode;
	error: ReactNode;
	children?: ReactNode;
	status: 'pending' | 'error' | 'success';
}

const WalletCardsListFx: FC<WalletCardsListFxProps> = ({
	pending,
	error,
	status,
	children,
 }) => {
	if (status === 'pending') {
		return pending;
	} else if (status === 'error') {
		return error;
	}

	return children;
}

WalletCardsListFx.displayName = 'WalletCardsListFx';

export { WalletCardsListFx };
export type { WalletCardsListFxProps };