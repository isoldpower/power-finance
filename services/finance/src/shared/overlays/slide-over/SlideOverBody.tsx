import type {FC, ReactNode} from "react";

interface SlideOverBodyProps {
	children: ReactNode;
}

const SlideOverBody: FC<SlideOverBodyProps> = ({ children }) => {
	return (
		<div className="fixed inset-y-0 right-0 z-[41] flex w-[440px] max-w-[92vw] flex-col border-l border-border bg-card shadow-[var(--shadow-lg)] animate-in slide-in-from-right duration-200">
			{children}
		</div>
	);
}

export { SlideOverBody };
export type { SlideOverBodyProps };