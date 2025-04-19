import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/overview/')({
	component: Index,
})

function Index() {
	return <div className="p-2">Hello from Overview!</div>
}