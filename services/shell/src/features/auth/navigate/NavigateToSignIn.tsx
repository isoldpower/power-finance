import type { FC } from "react";
import {Link, LinkProps, useLocation} from "@tanstack/react-router";
import {getShellRoute} from "@internal/shared";
import {getCleanPath} from "@shared/lib/utils/path.ts";

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
		<Link to={loginPath} {...props}>
			{children || 'Sign In'}
		</Link>
	)
}

NavigateToSignIn.displayName = 'NavigateToSignIn';

export { NavigateToSignIn };
export type { NavigateToSignInProps };
