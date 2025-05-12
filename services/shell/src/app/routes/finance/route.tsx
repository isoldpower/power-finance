import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/finance')({
  component: RouteComponent,
})

function RouteComponent() {
	return (
		<Outlet />
	);
}
