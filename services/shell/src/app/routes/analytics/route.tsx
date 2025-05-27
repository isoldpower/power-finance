import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/analytics')({
  component: RouteComponent,
})

function RouteComponent() {
	return (
		<Outlet />
	);
}
