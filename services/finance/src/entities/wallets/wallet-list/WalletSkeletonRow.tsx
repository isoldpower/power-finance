import { WalletSkeletonRowAction } from "./skeleton-row/WalletSkeletonRowAction.tsx";
import { WalletSkeletonRowAmount } from "./skeleton-row/WalletSkeletonRowAmount.tsx";
import { WalletSkeletonRowInfo } from "./skeleton-row/WalletSkeletonRowInfo.tsx";
import { WalletSkeletonRowSubtitle } from "./skeleton-row/WalletSkeletonRowSubtitle.tsx";
import { WalletSkeletonRowThumbnail } from "./skeleton-row/WalletSkeletonRowThumbnail.tsx";
import { WalletSkeletonRowTitle } from "./skeleton-row/WalletSkeletonRowTitle.tsx";

import type { FC, PropsWithChildren } from "react";
import type { WalletSkeletonRowInfoProps } from "./skeleton-row/WalletSkeletonRowInfo.tsx";


type WalletSkeletonRowProps = PropsWithChildren;
type WalletSkeletonRowObject = FC<WalletSkeletonRowProps> & {
	Action: FC;
	Amount: FC;
	Info: FC<WalletSkeletonRowInfoProps>;
	Subtitle: FC;
	Thumbnail: FC;
	Title: FC;
}

const WalletSkeletonRow: WalletSkeletonRowObject = ({ children }) => (
	<div className="flex items-center gap-[11px] border-l-[3px] border-l-transparent px-3.5 py-[11px]">
		{children}
	</div>
);

WalletSkeletonRow.Action = WalletSkeletonRowAction;
WalletSkeletonRow.Amount = WalletSkeletonRowAmount;
WalletSkeletonRow.Info = WalletSkeletonRowInfo;
WalletSkeletonRow.Subtitle = WalletSkeletonRowSubtitle;
WalletSkeletonRow.Thumbnail = WalletSkeletonRowThumbnail;
WalletSkeletonRow.Title = WalletSkeletonRowTitle;
WalletSkeletonRow.displayName = 'WalletSkeletonRow';

export { WalletSkeletonRow };
export type { WalletSkeletonRowProps };
