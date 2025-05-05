import { createFileRoute, Navigate } from '@tanstack/react-router'
import { getShellFinanceRoute } from "@internal/shared";

export const Route = createFileRoute('/finance')({
  component: Redirect,
})

function Redirect() {
  return (
		<Navigate to={getShellFinanceRoute('dashboard')} />
	)
}
