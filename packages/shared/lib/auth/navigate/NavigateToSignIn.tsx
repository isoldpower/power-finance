import type { FC } from "react";
import type { LinkProps } from "@tanstack/react-router";

import { Link, useLocation } from "@tanstack/react-router";
import { getShellRoute } from "../../config";
import { getCleanPath } from "../../utils";

interface NavigateToSignInProps extends Omit<LinkProps, 'to'> {
	className?: string;
	hideOnActive?: boolean;
}

const NavigateToSignIn: FC<NavigateToSignInProps> = ({
	children,
	hideOnActive,
	...props
}) => {
	const loginPath = getShellRoute('auth').login;
	const { pathname } = useLocation();

	return getCleanPath(pathname) === getCleanPath(loginPath) && hideOnActive ? null : (
		<Link to={loginPath} search={{ 'redirect_url': pathname }} {...props}>
			{children || 'Sign In'}
		</Link>
	)
}

NavigateToSignIn.displayName = 'NavigateToSignIn';

export { NavigateToSignIn };
export type { NavigateToSignInProps };
