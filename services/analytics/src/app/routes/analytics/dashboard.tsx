import { DashboardPage } from '@src/pages/dashboard-page'
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/analytics/dashboard')({
  component: DashboardPage,
});