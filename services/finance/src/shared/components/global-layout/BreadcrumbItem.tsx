import type {FC, ReactNode} from "react";

import {Link, useLocation} from "@tanstack/react-router";
import {
	BreadcrumbItem as UIBreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator
} from "@internal/ui-library";
import {BreadcrumbPage} from "@internal/ui-library";

interface BreadcrumbItemProps {
	to: string;
	children: ReactNode;
}

const BreadcrumbItem: FC<BreadcrumbItemProps> = ({
	to,
	children
}) => {
	const {pathname} = useLocation();

	return (
		<>
			<UIBreadcrumbItem>
				{to === pathname ? (
					<BreadcrumbPage>
						{children}
					</BreadcrumbPage>
				) : (
					<BreadcrumbLink asChild>
						<Link to={to}>
							{children}
						</Link>
					</BreadcrumbLink>
				)}
			</UIBreadcrumbItem>
			<BreadcrumbSeparator/>
		</>
	)
}

BreadcrumbItem.displayName = 'BreadcrumbItem';

export { BreadcrumbItem };
