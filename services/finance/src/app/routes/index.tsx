import {createFileRoute, Navigate} from '@tanstack/react-router'
import {getFinanceRoute} from "@internal/shared";

export const Route = createFileRoute('/')({
  component: Redirect,
})

function Redirect() {
  return (
		<Navigate to={getFinanceRoute('dashboard')} />
	)
}
