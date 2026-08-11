import { cn } from "@internal/ui-library";
import { RouteLink } from "@shared/routing";

import type { FC } from "react";
import type { RouteLinkProps } from "@shared/routing";
import { textClass } from "@shared/pure-components/typography";


const QuickAddLink: FC<Omit<RouteLinkProps, 'className'>> = ({
	children,
	...props
}) => (
	<RouteLink className={cn(textClass({ size: 'xs', tone: 'subtle' }), "mt-2.5 block text-center")} {...props}>
		{children}
	</RouteLink>
);

export { QuickAddLink };