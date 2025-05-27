import { createFileRoute, Navigate } from '@tanstack/react-router';


export const Route = createFileRoute('/analytics/')({
  component: RedirectToDashboard
})

function RedirectToDashboard() {
  return <Navigate to="/analytics/dashboard" replace />
}
