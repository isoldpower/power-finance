import type { FC } from "react";


interface AccountRowIconProps {
	children: string;
	className: string;
}

const AccountRowIcon: FC<AccountRowIconProps> = ({ children, className }) => (
	<div className={`flex size-[30px] flex-none items-center justify-center rounded-[8px] ${className}`}>
		{children}
	</div>
);

AccountRowIcon.displayName = 'AccountRowIcon';

export { AccountRowIcon };
export type { AccountRowIconProps };
