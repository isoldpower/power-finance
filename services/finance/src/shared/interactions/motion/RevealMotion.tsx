import type { FC, ReactNode } from "react";
import { cn } from "@internal/ui-library";


interface RevealMotionProps {
	delay?: number;
	className?: string;
	children: ReactNode;
}

const RevealMotion: FC<RevealMotionProps> = ({ delay = 0, className, children }) => (
	<div className={cn("fx-rise", className)} style={delay ? { animationDelay: `${delay.toString()}s` } : undefined}>
		{children}
	</div>
);

RevealMotion.displayName = 'RevealMotion';

export { RevealMotion };
export type { RevealMotionProps };
