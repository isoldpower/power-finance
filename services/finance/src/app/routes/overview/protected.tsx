import { createFileRoute } from '@tanstack/react-router'
import { AuthGuard } from "@feature/auth";

export const Route = createFileRoute('/overview/protected')({
	component: Index,
})

function Index() {
	return (
		<AuthGuard>
			<div className="p-2">
				This route should be only accessible when logged in
			</div>
		</AuthGuard>
	)
}