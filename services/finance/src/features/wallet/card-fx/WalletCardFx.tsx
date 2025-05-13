import { ReactNode, FC, Suspense } from "react";
import { useMemo } from "react";

interface WalletCardFxProps {
	staleWrap: FC<{ className?: string }>;
	spoiledWrap: FC<{ className?: string }>;
	defaultWrap?: FC<{ className?: string }>;
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
	const ComponentWrap: FC<{ className?: string }> | null = useMemo(() => {
		if (mutating || fetchStatus === 'fetching') return staleWrap;
		if (fetchStatus === 'paused') return spoiledWrap;

		return defaultWrap ?? null;
	}, [mutating, fetchStatus, staleWrap, spoiledWrap, defaultWrap]);

	return (
		<div className="relative">
			{ComponentWrap && <ComponentWrap className="absolute w-full h-full z-50" />}
			{children}
		</div>
	)
}

WalletCardFx.displayName = 'WalletCardFx';

export { WalletCardFx };
export type { WalletCardFxProps };