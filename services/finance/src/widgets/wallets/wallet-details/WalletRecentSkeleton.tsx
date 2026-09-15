import { WalletDetailsSkeleton } from "@entity/wallets";

import type { FC } from "react";


const PLACEHOLDER_ROWS = ['r1', 'r2', 'r3'];

const WalletRecentSkeleton: FC = () => (
	<WalletDetailsSkeleton.Rows>
		{PLACEHOLDER_ROWS.map((row) => (
			<WalletDetailsSkeleton.Row key={row} />
		))}
	</WalletDetailsSkeleton.Rows>
);

WalletRecentSkeleton.displayName = 'WalletRecentSkeleton';

export { WalletRecentSkeleton };
