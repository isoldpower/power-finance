import { useLocation } from "@tanstack/react-router";
import { FC, useMemo } from "react";
import {
	Breadcrumb,
	BreadcrumbList,
} from "@internal/ui-library";
import { BreadcrumbItem } from "./BreadcrumbItem.tsx";

interface RelativeBreadcrumbsProps {
	root?: string
}

const RelativeBreadcrumbs: FC<RelativeBreadcrumbsProps> = ({
	root = ''
}) => {
	const { pathname } = useLocation();
	const chunks = useMemo(() => {
		const cutPathname = pathname.replace(root, '');

		return cutPathname.split('/')
			.filter(Boolean);
	}, [pathname]);

	const breadcrumbs = useMemo(() => {
		return chunks.map((chunk, index) => {
			const path = `${chunks.slice(0, index + 1).join('/')}`;
			const capitalizedChunk = chunk.charAt(0).toUpperCase() + chunk.slice(1);
			return { name: capitalizedChunk, path };
		});
	}, [chunks]);

	return (
		<Breadcrumb className="flex items-center rounded border px-4 basis-[600px]">
			<BreadcrumbList>
				<BreadcrumbItem to={root}>
					Home
				</BreadcrumbItem>
				{breadcrumbs.map((breadcrumb, index) => (
					<BreadcrumbItem to={`${root}/${breadcrumb.path}`} key={index}>
						{breadcrumb.name}
					</BreadcrumbItem>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	)
}

RelativeBreadcrumbs.displayName = 'RelativeBreadcrumbs';

export { RelativeBreadcrumbs };
