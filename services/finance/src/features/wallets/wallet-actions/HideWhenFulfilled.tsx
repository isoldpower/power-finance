import type { FC, ReactNode } from "react";


interface HideWhenFulfilledProps {
	isPending: boolean;
	items: unknown[];
	minimum?: number;
	children: ReactNode;
}

const HideWhenFulfilled: FC<HideWhenFulfilledProps> = ({ 
	items,
	isPending,
	children,
	minimum = 5,
}) => {
	return isPending && items.length > 0 && items.length < minimum && (
		<>{children}</>
	);
}

export { HideWhenFulfilled };
export type { HideWhenFulfilledProps };