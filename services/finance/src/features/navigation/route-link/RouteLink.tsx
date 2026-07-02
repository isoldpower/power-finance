import type { FC, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { getFinanceRoute } from "@internal/shared";

type FinanceRouteKey = Parameters<typeof getFinanceRoute>[0];

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
