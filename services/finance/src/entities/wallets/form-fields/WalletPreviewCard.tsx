import type { FC } from "react";


interface WalletPreviewCardProps {
	gradient: string;
	type: string;
	currency: string;
	name: string;
}

const WalletPreviewCard: FC<WalletPreviewCardProps> = ({ gradient, type, currency, name }) => (
	<div
		className="mb-5 flex h-[120px] flex-col justify-between rounded-[12px] p-4 shadow-[var(--shadow-lg)]"
		style={{ background: gradient }}
	>
		<div className="flex items-center justify-between text-white/90">
			<span className="text-xs font-semibold tracking-[0.04em]">{type}</span>
			<span className="font-numeric text-[11px] opacity-85">{currency}</span>
		</div>
		<div className="font-display text-[19px] font-semibold tracking-[-0.01em] text-white">{name || 'Wallet name'}</div>
	</div>
);

WalletPreviewCard.displayName = 'WalletPreviewCard';

export { WalletPreviewCard };
export type { WalletPreviewCardProps };
