import { AccountHeaderIdentity } from "./header/AccountHeaderIdentity.tsx";

import type { FC, PropsWithChildren } from "react";
import type { AccountHeaderIdentityProps } from "./header/AccountHeaderIdentity.tsx";


type AccountHeaderProps = PropsWithChildren;
type AccountHeaderObject = FC<AccountHeaderProps> & {
	Identity: FC<AccountHeaderIdentityProps>;
};

const AccountHeader: AccountHeaderObject = ({ children }) => (
	<div className="flex items-center gap-3 border-b border-border px-3 py-3">
		{children}
	</div>
);

AccountHeader.Identity = AccountHeaderIdentity;
AccountHeader.displayName = 'AccountHeader';

export { AccountHeader };
export type { AccountHeaderProps };
