import { createFileRoute, Navigate } from '@tanstack/react-router';


export const Route = createFileRoute('/')({
	component: RedirectToOverview,
});

function RedirectToOverview() {
	return (
		<Navigate to="/overview" replace />
	);
}
