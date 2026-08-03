import type { ReactNode } from "react";


interface PageDescriptionProps {
	children: ReactNode;
}

const PageDescription = ({ children }: PageDescriptionProps) => {
	return (
		<span className="hidden font-numeric text-[11px] uppercase tracking-[0.08em] text-text-3 sm:block">
			{children}
		</span>
	);
}

export { PageDescription };