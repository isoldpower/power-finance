import type { FC } from "react";
import type {LinkProps} from "@tanstack/react-router";
import {Link} from "@tanstack/react-router";
import {getShellRoute} from "@internal/shared";

interface NavigateToLandingProps extends Omit<LinkProps, 'to'> {
	className?: string;
}

const NavigateToLanding: FC<NavigateToLandingProps> = ({ children, ...props }) => {
	return (
		<Link to={getShellRoute('landing')} {...props}>
			{children || 'Landing'}
		</Link>
	)
}

NavigateToLanding.displayName = 'NavigateToLanding';

export { NavigateToLanding };
export type { NavigateToLandingProps };