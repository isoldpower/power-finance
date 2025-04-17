interface HeaderBreadcrumbsProps {

}

function HeaderBreadcrumbs({

}: HeaderBreadcrumbsProps) {
	return (
		<div className="flex items-center gap-2">
			<span className="text-gray-500">Home</span>
			<span className="text-gray-500">/</span>
			<span className="text-gray-500">Dashboard</span>
		</div>
	)
}

HeaderBreadcrumbs.displayName = 'HeaderBreadcrumbs';

export { HeaderBreadcrumbs };
export type { HeaderBreadcrumbsProps };
