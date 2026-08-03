import type { BaseHTMLAttributes, FC } from "react";
import {cn} from "@internal/ui-library";


const NoActivityPlaceholderTitle: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div 
			className={cn(
				'absolute flex flex-col items-center justify-center top-0 bottom-0 left-0',
				'text-[13px] font-medium text-text-3 opacity-50'
			)} {...props}
		>
			{children}
		</div>
	);
}

export { NoActivityPlaceholderTitle };