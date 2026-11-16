import { Link } from "@tanstack/react-router";
import { getAnalyticsRoute } from "@internal/shared";

import type { FC, ReactNode } from "react";
import type { AnalyticsRouteKey } from "./types.ts";


interface RouteLinkProps {
	to: AnalyticsRouteKey;
	className?: string;
	children: ReactNode;
}

const RouteLink: FC<RouteLinkProps> = ({ to, className, children }) => (
	<Link to={getAnalyticsRoute(to)} className={className}>
		{children}
	</Link>
);

RouteLink.displayName = 'RouteLink';

export { RouteLink };
export type { RouteLinkProps };
