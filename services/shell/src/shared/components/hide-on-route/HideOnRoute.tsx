import type {FC, ReactNode} from "react";
import {useMemo} from "react";
import {useLocation} from "@tanstack/react-router";
import {getCleanPath} from "@internal/shared";

interface HideOnRouteProps {
	routes: string[];
	children: ReactNode;
}

const HideOnRoute: FC<HideOnRouteProps> = ({ routes, children }) => {
	const cleanRoutes = useMemo(() => {
		return routes.map((route) => getCleanPath(route));
	}, [routes]);
	const {pathname} = useLocation();

	const match = cleanRoutes.find((route) => pathname.includes(route));

	return match
		? <div className="hidden">{children}</div>
		: children
}

HideOnRoute.displayName = 'HideOnRoute';

export { HideOnRoute };
export type { HideOnRouteProps };
