import type {FC, ReactNode} from "react";


interface SlideOverHeadingProps {
	children: ReactNode;
}

const SlideOverHeading: FC<SlideOverHeadingProps> = ({ children }) => {
	return (
		<div className="flex items-center gap-2.5 border-b border-border px-5 py-4">
			{children}
		</div>
	);
}

export { SlideOverHeading };
export type { SlideOverHeadingProps };
