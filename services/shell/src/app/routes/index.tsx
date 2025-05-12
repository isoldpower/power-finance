import { getShellRoute } from '@internal/shared'
import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
	component: RedirectToHome
})

function RedirectToHome() {
	return (
		<Navigate to={getShellRoute('landing')} replace />
	);
}
