import type { FC, ReactNode } from "react";


interface AccountRowDescriptionProps {
	children: ReactNode;
}

const AccountRowDescription: FC<AccountRowDescriptionProps> = ({ children }) => (
	<div className="truncate text-[13px] font-semibold">
		{children}
	</div>
);

AccountRowDescription.displayName = 'AccountRowDescription';

export { AccountRowDescription };
export type { AccountRowDescriptionProps };
