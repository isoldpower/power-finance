import type { ReactNode, FC } from "react";
import { useMemo, Fragment } from "react";

interface WalletCardFxProps {
	staleWrap: FC<{ children: ReactNode }>;
	spoiledWrap: FC<{ children: ReactNode }>;
	defaultWrap?: FC<{ children: ReactNode }>;
	children?: ReactNode;
	mutating?: boolean;
	fetchStatus: 'fetching' | 'paused' | 'idle';
}

const WalletCardFx: FC<WalletCardFxProps> = ({
	staleWrap,
	spoiledWrap,
	fetchStatus,
	defaultWrap,
	mutating = false,
	children,
}) => {
	const ComponentWrap: FC<{ children: ReactNode }> = useMemo(() => {
		if (mutating || fetchStatus === 'fetching') return staleWrap;
		if (fetchStatus === 'paused') return spoiledWrap;

		return defaultWrap ?? Fragment;
	}, [fetchStatus, staleWrap, spoiledWrap, mutating]);

	return (
		<ComponentWrap>
			{children}
		</ComponentWrap>
	)
}

WalletCardFx.displayName = 'WalletCardFx';

export { WalletCardFx };
export type { WalletCardFxProps };