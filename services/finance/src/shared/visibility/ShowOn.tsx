import type { ReactNode } from "react";


interface ShowOnProps<T> {
	condition: T;
	children: ((cleanItem: NonNullable<T>) => ReactNode) | ReactNode;
}

function ShowOn<T = boolean>({ 
	condition,
	children
}: ShowOnProps<T>){
	return condition 
		? typeof children === 'function' 
			? children(condition) 
			: children 
		: null;
}

ShowOn.displayName = 'ShowOn';

export { ShowOn };
export type { ShowOnProps };
