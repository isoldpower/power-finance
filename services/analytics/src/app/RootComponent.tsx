import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { FC, ReactNode } from "react";


interface RootComponentProps {
	children: ReactNode;
}

const RootComponent: FC<RootComponentProps> = ({ 
	children
 }) => {
	return (
		<div>
			{children}
			<TanStackRouterDevtools initialIsOpen={false} position='bottom-left' />
		</div>
	);
}

export { RootComponent };
export type { RootComponentProps };