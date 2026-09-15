import { SkeletonText } from "@shared/pure-components/feedback";

import { WalletsRecentTitle } from "../../wallet-list/WalletsRecentTitle.tsx";

import type { FC } from "react";


const WalletDetailsSkeletonSection: FC = () => (
	<WalletsRecentTitle>
		<SkeletonText size="13.5" width="w-36" className="inline-block" />
	</WalletsRecentTitle>
);

WalletDetailsSkeletonSection.displayName = 'WalletDetailsSkeletonSection';

export { WalletDetailsSkeletonSection };
