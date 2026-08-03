import type { FC, BaseHTMLAttributes } from "react";


const WalletBalance: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div className="font-numeric text-[10px] uppercase tracking-[0.1em] text-text-3" {...props}>
			{children}
		</div>
	);
}

export { WalletBalance };