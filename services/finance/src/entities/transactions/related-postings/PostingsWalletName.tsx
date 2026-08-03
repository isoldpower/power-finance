import { cn } from "@internal/ui-library";
import type { BaseHTMLAttributes, FC } from "react";


const PostingsWalletName: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}	) => {
	return (
		<div 
			className={cn(
				"truncate text-[12.5px] font-semibold", 
			)}
			{...props}
		>
			{children}
		</div>	
	);
}

export { PostingsWalletName };