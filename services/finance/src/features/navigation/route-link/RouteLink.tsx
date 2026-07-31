import { Link } from "@tanstack/react-router";
import { getFinanceRoute } from "@internal/shared";

import type { FC, ReactNode } from "react";
import type { FinanceRouteKey } from "../types";


interface RouteLinkProps {
	to: FinanceRouteKey;
	className?: string;
	children: ReactNode;
}

const RouteLink: FC<RouteLinkProps> = ({ to, className, children }) => (
	<Link to={getFinanceRoute(to)} className={className}>
		{children}
	</Link>
);

RouteLink.displayName = 'RouteLink';

export { RouteLink };
export type { RouteLinkProps, FinanceRouteKey };
