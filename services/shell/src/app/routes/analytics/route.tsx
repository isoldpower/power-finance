import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/analytics')({
  staticData: { title: 'Analytics' },
  component: RouteComponent,
})

function RouteComponent() {
	return (
		<Outlet />
	);
}
