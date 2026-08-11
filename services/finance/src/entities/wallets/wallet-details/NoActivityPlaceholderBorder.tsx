import type { BaseHTMLAttributes, FC } from "react";
import {cn} from "@internal/ui-library";


const NoActivityPlaceholderBorder: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className' | 'children'>> = ({
	...props
}) => {
	return (
		<div 
			className={cn(
				"size-[30px] flex-none rounded-[8px]",
				"border border-dashed border-border-strong",
			)} 
			{...props} 
		/>
	);
}

export { NoActivityPlaceholderBorder };