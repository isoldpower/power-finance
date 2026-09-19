import { WalletSkeletonRow } from "@entity/wallets";
import { List } from "@shared/pure-components/collections";

import type { FC, ReactNode } from "react";


const PLACEHOLDER_KEYS = ['w1', 'w2', 'w3', 'w4', 'w5'];

interface WalletsDirectoryFxProps {
	isPending: boolean;
	children: ReactNode;
}

const WalletsDirectoryFx: FC<WalletsDirectoryFxProps> = ({ isPending, children }) => {
	if (isPending) {
		return <WalletsDirectorySkeleton />;
	}

	return children;
};

const WalletsDirectorySkeleton: FC = () => (
	<List className="divide-y divide-border">
		{PLACEHOLDER_KEYS.map((key) => (
			<WalletSkeletonRow key={key}>
				<WalletSkeletonRow.Thumbnail />
				<WalletSkeletonRow.Info>
					<WalletSkeletonRow.Title />
					<WalletSkeletonRow.Subtitle />
				</WalletSkeletonRow.Info>
				<WalletSkeletonRow.Amount />
				<WalletSkeletonRow.Action />
			</WalletSkeletonRow>
		))}
	</List>
);

WalletsDirectoryFx.displayName = 'WalletsDirectoryFx';

export { WalletsDirectoryFx };
export type { WalletsDirectoryFxProps };
