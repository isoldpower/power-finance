import type { FC, ReactNode } from "react";

import { Button } from "@internal/ui-library";
import { getFinanceRoute } from "@internal/shared";
import { Link } from "@tanstack/react-router";

interface EmptyWalletsExternalProps {
	children?: ReactNode;
}

const EmptyWalletsExternal: FC<EmptyWalletsExternalProps> = ({}) => {
	return (
		<div className="col-span-3 text-center py-10 border border-dashed rounded-lg">
			<p className="text-gray-500">No wallets found</p>
			<Button variant="link" asChild>
				<Link to={getFinanceRoute('wallets')}>
					Add your first wallet
				</Link>
			</Button>
		</div>
	)
}

EmptyWalletsExternal.displayName = 'EmptyWalletsExternal';

export { EmptyWalletsExternal };
export type { EmptyWalletsExternalProps };