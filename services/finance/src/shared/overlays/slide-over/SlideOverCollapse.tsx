import type { FC, ReactNode } from "react";
import { useSlideOverContext } from "./context/use-context-value.ts";

interface SlideOverCollapseProps {
	children: ReactNode;
}

const SlideOverCollapse: FC<SlideOverCollapseProps> = ({ children }) => {
	const context = useSlideOverContext();
	
	return (
		<button 
			onClick={context.onClose}
			type="button"
			className="flex size-7 items-center justify-center rounded-[var(--radius-md)] border border-border-strong text-text-2 hover:bg-secondary"
		>
			{children}
		</button>
	);
}

export { SlideOverCollapse };
export type { SlideOverCollapseProps };