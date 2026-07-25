import type {FC, ReactNode} from "react";


interface SlideOverTitleProps {
	children: ReactNode;
}

const SlideOverTitle: FC<SlideOverTitleProps> = ({ children }) => {
	return (
		<span className="flex-1 font-display text-[17px] font-semibold">
			{children}
		</span>
	);
}

export { SlideOverTitle };
export type { SlideOverTitleProps };