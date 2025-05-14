import { FC, ReactNode } from "react";


interface RootComponentProps {
	children: ReactNode;
}

const RootComponent: FC<RootComponentProps> = ({ 
	children
 }) => {
	return (
		<div>
			{children}
		</div>
	);
}

export { RootComponent };
export type { RootComponentProps };