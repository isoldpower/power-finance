import type { FC, ReactNode } from "react";


interface CompositionBarProps {
	children: ReactNode;
}

const CompositionBar: FC<CompositionBarProps> = ({ children }) => (
	<div className="flex h-6 w-full items-stretch gap-0.5 rounded-[6px] bg-secondary">
		{children}
	</div>
);

CompositionBar.displayName = 'CompositionBar';

export { CompositionBar };
export type { CompositionBarProps };
