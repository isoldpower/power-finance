import { cn } from "@internal/ui-library";

import { Text } from "../typography";

import type { FC } from "react";
import type { TextFamily, TextSize } from "../typography";


interface SkeletonTextProps {
	size?: TextSize;
	family?: TextFamily;
	width: string;
	className?: string;
}

const SkeletonText: FC<SkeletonTextProps> = ({ size, family, width, className }) => (
	<Text
		aria-hidden
		as="span"
		size={size}
		family={family}
		className={cn("relative block select-none text-transparent", width, className)}
	>
		&nbsp;
		<span className="absolute inset-x-0 inset-y-[14%] animate-pulse rounded-md bg-accent" />
	</Text>
);

SkeletonText.displayName = 'SkeletonText';

export { SkeletonText };
export type { SkeletonTextProps };
