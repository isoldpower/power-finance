import { createFileRoute, Navigate } from '@tanstack/react-router'
import { AppLoader } from "@internal/ui-library";

export const Route = createFileRoute('/')({
	pendingComponent: AppLoader,
	component: HomePage
})

function HomePage() {
	return (
		<Navigate to='/landing' replace />
	);
}

