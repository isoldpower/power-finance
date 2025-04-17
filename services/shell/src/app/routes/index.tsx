import {createFileRoute, Outlet} from '@tanstack/react-router'
import {BrandAppLoader} from "@widget/core";

export const Route = createFileRoute('/')({
	pendingComponent: BrandAppLoader,
	component: HomePage
})

function HomePage() {
	return (
		<div className="p-2">
			<h3>Index Page</h3>
			<Outlet />
		</div>
	)
}