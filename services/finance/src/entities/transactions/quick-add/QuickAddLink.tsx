import { cn } from "@internal/ui-library";
import { RouteLink } from "@shared/routing";
import { textClass } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";
import type { RouteLinkProps } from "@shared/routing";


type QuickAddLinkProps = PropsWithChildren<Omit<RouteLinkProps, 'className'>>;

const QuickAddLink: FC<QuickAddLinkProps> = ({
	children,
	...props
}) => (
	<RouteLink
		className={cn(textClass({ size: 'xs', tone: 'subtle' }), "mt-2.5 block text-center")}
		{...props}
	>
		{children}
	</RouteLink>
);

QuickAddLink.displayName = 'QuickAddLink';

export { QuickAddLink };
export type { QuickAddLinkProps };
