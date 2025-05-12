import { FinancePage } from '@/pages/finance-page';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/finance/$')({
  component: RouteComponent,
})

function RouteComponent() {
	return (
		<FinancePage />
	);
}
