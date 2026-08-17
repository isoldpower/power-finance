import { WalletDetailsSkeletonAction } from "./details-skeleton/WalletDetailsSkeletonAction.tsx";
import { WalletDetailsSkeletonActions } from "./details-skeleton/WalletDetailsSkeletonActions.tsx";
import { WalletDetailsSkeletonBalance } from "./details-skeleton/WalletDetailsSkeletonBalance.tsx";
import { WalletDetailsSkeletonBalances } from "./details-skeleton/WalletDetailsSkeletonBalances.tsx";
import { WalletDetailsSkeletonBody } from "./details-skeleton/WalletDetailsSkeletonBody.tsx";
import { WalletDetailsSkeletonHeader } from "./details-skeleton/WalletDetailsSkeletonHeader.tsx";
import { WalletDetailsSkeletonMetric } from "./details-skeleton/WalletDetailsSkeletonMetric.tsx";
import { WalletDetailsSkeletonRow } from "./details-skeleton/WalletDetailsSkeletonRow.tsx";
import { WalletDetailsSkeletonRows } from "./details-skeleton/WalletDetailsSkeletonRows.tsx";
import { WalletDetailsSkeletonSection } from "./details-skeleton/WalletDetailsSkeletonSection.tsx";
import { WalletDetailsSkeletonSubtitle } from "./details-skeleton/WalletDetailsSkeletonSubtitle.tsx";
import { WalletDetailsSkeletonSwatch } from "./details-skeleton/WalletDetailsSkeletonSwatch.tsx";
import { WalletDetailsSkeletonThumbnail } from "./details-skeleton/WalletDetailsSkeletonThumbnail.tsx";
import { WalletDetailsSkeletonTitle } from "./details-skeleton/WalletDetailsSkeletonTitle.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { WalletDetailsSkeletonActionProps } from "./details-skeleton/WalletDetailsSkeletonAction.tsx";
import type { WalletDetailsSkeletonActionsProps } from "./details-skeleton/WalletDetailsSkeletonActions.tsx";
import type { WalletDetailsSkeletonBalancesProps } from "./details-skeleton/WalletDetailsSkeletonBalances.tsx";
import type { WalletDetailsSkeletonBodyProps } from "./details-skeleton/WalletDetailsSkeletonBody.tsx";
import type { WalletDetailsSkeletonHeaderProps } from "./details-skeleton/WalletDetailsSkeletonHeader.tsx";
import type { WalletDetailsSkeletonRowsProps } from "./details-skeleton/WalletDetailsSkeletonRows.tsx";
import type { WalletDetailsSkeletonThumbnailProps } from "./details-skeleton/WalletDetailsSkeletonThumbnail.tsx";


type WalletDetailsSkeletonProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>
>;
type WalletDetailsSkeletonObject = FC<WalletDetailsSkeletonProps> & {
	Action: FC<WalletDetailsSkeletonActionProps>;
	Actions: FC<WalletDetailsSkeletonActionsProps>;
	Balance: FC;
	Balances: FC<WalletDetailsSkeletonBalancesProps>;
	Body: FC<WalletDetailsSkeletonBodyProps>;
	Header: FC<WalletDetailsSkeletonHeaderProps>;
	Metric: FC;
	Row: FC;
	Rows: FC<WalletDetailsSkeletonRowsProps>;
	Section: FC;
	Subtitle: FC;
	Swatch: FC;
	Thumbnail: FC<WalletDetailsSkeletonThumbnailProps>;
	Title: FC;
}

const WalletDetailsSkeleton: WalletDetailsSkeletonObject = ({
	children,
	...props
}) => (
	<div {...props}>
		{children}
	</div>
);

WalletDetailsSkeleton.Action = WalletDetailsSkeletonAction;
WalletDetailsSkeleton.Actions = WalletDetailsSkeletonActions;
WalletDetailsSkeleton.Balance = WalletDetailsSkeletonBalance;
WalletDetailsSkeleton.Balances = WalletDetailsSkeletonBalances;
WalletDetailsSkeleton.Body = WalletDetailsSkeletonBody;
WalletDetailsSkeleton.Header = WalletDetailsSkeletonHeader;
WalletDetailsSkeleton.Metric = WalletDetailsSkeletonMetric;
WalletDetailsSkeleton.Row = WalletDetailsSkeletonRow;
WalletDetailsSkeleton.Rows = WalletDetailsSkeletonRows;
WalletDetailsSkeleton.Section = WalletDetailsSkeletonSection;
WalletDetailsSkeleton.Subtitle = WalletDetailsSkeletonSubtitle;
WalletDetailsSkeleton.Swatch = WalletDetailsSkeletonSwatch;
WalletDetailsSkeleton.Thumbnail = WalletDetailsSkeletonThumbnail;
WalletDetailsSkeleton.Title = WalletDetailsSkeletonTitle;
WalletDetailsSkeleton.displayName = 'WalletDetailsSkeleton';

export { WalletDetailsSkeleton };
export type { WalletDetailsSkeletonProps };
