import { getFinanceRoute } from '@internal/shared';
import { createFileRoute, Navigate } from '@tanstack/react-router'


export const Route = createFileRoute('/')({
  component: Redirect,
});

function Redirect() {
  return (
		<Navigate to={getFinanceRoute('dashboard')} />
	);
}