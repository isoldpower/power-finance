import {ReactNode} from "react";

interface MainTitleProps {
	children: ReactNode;
}

const MainPageTitle = ({ children }: MainTitleProps) => {
	return (
		<h1 className="font-display text-2xl font-semibold tracking-[-0.01em]">
			{children}
		</h1>
	);
}

export { MainPageTitle };