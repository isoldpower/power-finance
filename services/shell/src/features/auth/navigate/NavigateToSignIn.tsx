import type { FC } from "react";
import {Link, LinkProps} from "@tanstack/react-router";
import {getShellRoute} from "@internal/shared";

interface NavigateToSignInProps extends Omit<LinkProps, 'to'> {
}

const NavigateToSignIn: FC<NavigateToSignInProps> = ({ children, ...props }) => {
	return (
		<Link to={getShellRoute('auth').login} {...props}>
			{children || 'Sign In'}
		</Link>
	)
}

NavigateToSignIn.displayName = 'NavigateToSignIn';

export { NavigateToSignIn };
export type { NavigateToSignInProps };
