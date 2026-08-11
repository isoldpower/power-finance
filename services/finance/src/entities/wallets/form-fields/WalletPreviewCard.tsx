import { Heading, MetaText, Text } from "@shared/pure-components/typography";

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
			<Text size="xs" weight="semibold" tracking="0.04em">{type}</Text>
			<MetaText tone="default" className="opacity-85">{currency}</MetaText>
		</div>
		<Heading as="div" size="19" tone="inverted">{name || 'Wallet name'}</Heading>
	</div>
);

WalletPreviewCard.displayName = 'WalletPreviewCard';

export { WalletPreviewCard };
export type { WalletPreviewCardProps };
