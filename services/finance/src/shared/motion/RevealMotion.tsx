import { cn } from "@internal/ui-library";

import type { FC, ReactNode } from "react";


interface RevealMotionProps {
	delay?: number;
	className?: string;
	id?: string;
	children: ReactNode;
}

const RevealMotion: FC<RevealMotionProps> = ({ delay = 0, className, id, children }) => (
	<div 
		id={id}
		className={cn("fx-rise", className)} 
		style={delay ? { animationDelay: `${delay.toString()}s` } : undefined
	}>
		{children}
	</div>
);

RevealMotion.displayName = 'RevealMotion';

export { RevealMotion };
export type { RevealMotionProps };
