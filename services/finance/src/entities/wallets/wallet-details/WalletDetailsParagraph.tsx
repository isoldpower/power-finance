import type { BaseHTMLAttributes, FC } from "react";


const WalletDetailsParagraph: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div className="text-[12.5px] text-text-3" {...props}>
			{children}
		</div>	
	);
}

export { WalletDetailsParagraph };