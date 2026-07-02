import type { FC } from "react";


interface AccountRowDateProps {
	children: string;
}

const AccountRowDate: FC<AccountRowDateProps> = ({ children }) => (
	<div className="font-numeric text-[10.5px] text-text-3">
		{children}
	</div>
);

AccountRowDate.displayName = 'AccountRowDate';

export { AccountRowDate };
export type { AccountRowDateProps };
