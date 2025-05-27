import { createFileRoute } from '@tanstack/react-router'
import { AnalyticsPage } from "@page/analytics-page";

export const Route = createFileRoute('/analytics/$')({
  component: AnalyticsPage,
});