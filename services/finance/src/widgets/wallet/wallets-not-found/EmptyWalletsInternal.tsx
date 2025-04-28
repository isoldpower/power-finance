import type { FC } from "react";

import { Button, Icons } from "@internal/ui-library";

interface EmptyWalletsInternalProps {
	openModal?: () => void;
}

const EmptyWalletsInternal: FC<EmptyWalletsInternalProps> = ({ openModal }) => {
	return (
		<div className="col-span-3 text-center py-12 border border-dashed rounded-lg">
			<p className="text-gray-500">No wallets found</p>
			<p className="text-sm text-gray-400 mt-1">Add your first wallet to get started</p>
			<Button
				onClick={openModal}
				className="mt-4"
				size="sm"
			>
				<div className="flex items-center gap-2">
					<Icons.Plus size={16} />
					Add Wallet
				</div>
			</Button>
		</div>
	)
}

EmptyWalletsInternal.displayName = 'EmptyWalletsInternal';

export { EmptyWalletsInternal };