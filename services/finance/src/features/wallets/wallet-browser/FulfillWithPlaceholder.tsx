import { cloneElement } from "react";

import type { FC, ReactElement } from "react";


interface FulfillWithPlaceholderProps {
	current: number;
	minimum: number;
	children: ReactElement<object>;
}

const FulfillWithPlaceholder: FC<FulfillWithPlaceholderProps> = ({
	current,
	minimum,	
	children,
}) => {
	return Array
		.from({ length: Math.max(0, minimum - current) })
		.map((_, index) => cloneElement(children, {
			...children.props,
			key: `placeholder-${index.toString()}`
		}));
}

export { FulfillWithPlaceholder };