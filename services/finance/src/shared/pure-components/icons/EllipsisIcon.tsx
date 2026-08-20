import { Icons } from "@internal/ui-library";

import type { FC } from "react";


interface EllipsisIconProps {
	size?: number;
	className?: string;
}

const EllipsisIcon: FC<EllipsisIconProps> = ({ size = 14, className }) => (
	<Icons.Ellipsis size={size} className={className} />
);

EllipsisIcon.displayName = 'EllipsisIcon';

export { EllipsisIcon };
export type { EllipsisIconProps };
