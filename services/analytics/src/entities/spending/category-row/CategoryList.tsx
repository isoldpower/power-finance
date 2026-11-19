import { useMemo } from "react";
import { cn } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type CategoryListProps = PropsWithChildren<{
	label: string;
	height?: number;
}>;

const CategoryList: FC<CategoryListProps> = ({ label, height, children }) => {
	const style = useMemo(() => {
		return height === undefined ? undefined : { height };
	}, [height]);

	return (
		<ul
			aria-label={label}
			style={style}
			className={cn(
				"grid content-start gap-0.5",
				height !== undefined && "-mr-2 overflow-y-auto overscroll-contain pr-2 [scrollbar-width:thin]",
			)}
		>
			{children}
		</ul>
	);
};

CategoryList.displayName = 'CategoryList';

export { CategoryList };
export type { CategoryListProps };
