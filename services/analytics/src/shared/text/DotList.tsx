import { Children, isValidElement } from "react";
import { Icons } from "@internal/ui-library";

import type { FC, ReactNode } from "react";


interface DotListProps {
	children: ReactNode;
}

type DotListChild = ReturnType<typeof Children.toArray>[number];

const SEPARATOR_SIZE = 14;

const childKey = (child: DotListChild): string => {
	if (isValidElement(child)) {
		return child.key ?? '';
	}

	if (typeof child === 'string' || typeof child === 'number') {
		return child.toString();
	}

	return '';
};

const DotList: FC<DotListProps> = ({ children }) => {
	const items = Children.toArray(children);

	return (
		<>
			{items.map((child) => (
				<span key={childKey(child)} className="[&:first-child>svg]:hidden">
					<Icons.Dot
						aria-hidden
						size={SEPARATOR_SIZE}
						className="-mx-0.5 inline-block align-[-0.2em] opacity-70"
					/>
					{child}
				</span>
			))}
		</>
	);
};

DotList.displayName = 'DotList';

export { DotList };
export type { DotListProps };
