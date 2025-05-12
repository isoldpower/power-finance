import { createFileRoute, Navigate } from '@tanstack/react-router'
import { getFinanceRoute } from "@internal/shared";

export const Route = createFileRoute('/finance/')({
  component: Redirect,
})

function Redirect() {
  return (
    <div>hi</div>
		// <Navigate to={getFinanceRoute('dashboard')} />
	)
}
