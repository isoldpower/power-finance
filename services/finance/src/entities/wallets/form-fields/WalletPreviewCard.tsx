import { cn } from "@internal/ui-library";
import { WalletPreviewCurrency } from "./preview-card/WalletPreviewCurrency.tsx";
import { WalletPreviewHeader } from "./preview-card/WalletPreviewHeader.tsx";
import { WalletPreviewName } from "./preview-card/WalletPreviewName.tsx";
import { WalletPreviewType } from "./preview-card/WalletPreviewType.tsx";

import type { FC, PropsWithChildren } from "react";
import type { WalletPreviewCurrencyProps } from "./preview-card/WalletPreviewCurrency.tsx";
import type { WalletPreviewHeaderProps } from "./preview-card/WalletPreviewHeader.tsx";
import type { WalletPreviewNameProps } from "./preview-card/WalletPreviewName.tsx";
import type { WalletPreviewTypeProps } from "./preview-card/WalletPreviewType.tsx";


type WalletPreviewCardProps = PropsWithChildren<{
	gradient: string;
}>;
type WalletPreviewCardObject = FC<WalletPreviewCardProps> & {
	Currency: FC<WalletPreviewCurrencyProps>;
	Header: FC<WalletPreviewHeaderProps>;
	Name: FC<WalletPreviewNameProps>;
	Type: FC<WalletPreviewTypeProps>;
}

const WalletPreviewCard: WalletPreviewCardObject = ({ children, gradient }) => (
	<div
		className={cn(
			"mb-5 flex h-[120px] flex-col justify-between rounded-[12px] p-4 shadow-[var(--shadow-lg)]"
		)}
		style={{ background: gradient }}
	>
		{children}
	</div>
);

WalletPreviewCard.Currency = WalletPreviewCurrency;
WalletPreviewCard.Header = WalletPreviewHeader;
WalletPreviewCard.Name = WalletPreviewName;
WalletPreviewCard.Type = WalletPreviewType;
WalletPreviewCard.displayName = 'WalletPreviewCard';

export { WalletPreviewCard };
export type { WalletPreviewCardProps };
