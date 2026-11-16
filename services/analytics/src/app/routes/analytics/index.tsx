import { createFileRoute, Navigate } from '@tanstack/react-router';


export const Route = createFileRoute('/analytics/')({
	component: RedirectToOverview,
});

function RedirectToOverview() {
	return <Navigate to="/analytics/overview" replace />;
}
