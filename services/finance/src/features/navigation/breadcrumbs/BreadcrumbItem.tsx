import type {FC, ReactNode} from "react";

import {Link, useLocation} from "@tanstack/react-router";
import {
	UiBreadcrumbItem,
	UiBreadcrumbLink,
	UiBreadcrumbSeparator,
	UiBreadcrumbPage
} from "@internal/ui-library";


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
			<UiBreadcrumbItem>
				{to === pathname ? (
					<UiBreadcrumbPage>
						{children}
					</UiBreadcrumbPage>
				) : (
					<UiBreadcrumbLink asChild>
						<Link to={to}>
							{children}
						</Link>
					</UiBreadcrumbLink>
				)}
			</UiBreadcrumbItem>
			<UiBreadcrumbSeparator/>
		</>
	)
}

BreadcrumbItem.displayName = 'BreadcrumbItem';

export { BreadcrumbItem };
