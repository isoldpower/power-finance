import type { FC } from "react";
import type { LinkProps } from "@tanstack/react-router";

import { useLocation } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { getShellRoute } from "../../config";
import { getCleanPath } from "../../utils";

interface NavigateToRecoveryProps extends Omit<LinkProps, 'to'> {
	className?: string;
	hideOnActive?: boolean;
}

const NavigateToRecovery: FC<NavigateToRecoveryProps> = ({ children, hideOnActive, ...props }) => {
  const recoveryPath = getShellRoute('auth').recovery;
  const { pathname } = useLocation();

  return getCleanPath(pathname) === getCleanPath(recoveryPath) && hideOnActive ? null : (
		<Link to={recoveryPath} {...props}>
			{children || 'Forgot password?'}
		</Link>
  );
};

NavigateToRecovery.displayName = 'NavigateToRecovery';

export { NavigateToRecovery };
export type { NavigateToRecoveryProps };
