import { Caption, CardTitle } from "@internal/shared";

import type { FC } from "react";


interface AccountHeaderIdentityProps {
	title: string;
	caption: string;
}

const AccountHeaderIdentity: FC<AccountHeaderIdentityProps> = ({ title, caption }) => (
	<div className="min-w-0">
		<CardTitle truncate>
			{title}
		</CardTitle>
		<Caption size="11.5" truncate>
			{caption}
		</Caption>
	</div>
);

AccountHeaderIdentity.displayName = 'AccountHeaderIdentity';

export { AccountHeaderIdentity };
export type { AccountHeaderIdentityProps };
