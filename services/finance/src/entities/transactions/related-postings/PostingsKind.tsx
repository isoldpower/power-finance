import { cn } from "@internal/ui-library";
import type { BaseHTMLAttributes, FC } from "react";


const PostingsKind: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}	) => {
	return (
		<div 
			className={cn(
				"font-numeric text-[9px] tracking-[0.08em] text-text-3", 
			)}
			{...props}
		>
			{children}
		</div>	
	);
}

export { PostingsKind };