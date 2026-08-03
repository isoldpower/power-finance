import type { BaseHTMLAttributes, FC } from "react";


const WalletDetailsTitle: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div className="truncate font-display text-lg font-semibold" {...props}>
			{children}
		</div>	
	);
}

export { WalletDetailsTitle };