import { cn } from "@internal/ui-library";
import type { BaseHTMLAttributes, FC } from "react";
import type { Tone } from "@shared/formatting";


interface PostingsDirectionIconProps extends Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'> {
	tone: Tone;
}

const PostingsDirectionIcon: FC<PostingsDirectionIconProps> = ({
	children,
	tone,
	...props
}	) => {
	return (
		<div 
			className={cn(
				"flex size-7 flex-none items-center justify-center rounded-[7px]", 
				tone === 'pos' && 'bg-pos-soft text-pos',
				tone === 'neg' && 'bg-[var(--neg-soft)] text-neg'
			)}
			{...props}
		>
			{children}
		</div>	
	);
}

export { PostingsDirectionIcon };