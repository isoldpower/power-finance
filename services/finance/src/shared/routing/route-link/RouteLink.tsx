import { Link } from "@tanstack/react-router";
import { getFinanceRoute } from "@internal/shared";

import type { FC, ReactNode } from "react";
import type { FinanceRouteKey } from "../types.ts";


interface RouteLinkProps {
	to: FinanceRouteKey;
	search?: Record<string, string>;
	className?: string;
	children: ReactNode;
}

const RouteLink: FC<RouteLinkProps> = ({ to, search, className, children }) => (
	<Link to={getFinanceRoute(to)} search={search} className={className}>
		{children}
	</Link>
);

RouteLink.displayName = 'RouteLink';

export { RouteLink };
export type { RouteLinkProps };
