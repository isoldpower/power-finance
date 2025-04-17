import {createFileRoute, useParams} from '@tanstack/react-router'

export const Route = createFileRoute('/analytics/$id')({
	component: () => {
		const { id } = useParams({ from: '/analytics/$id' });

		return (
			<div className="p-2">
				<h3>Analytics id {id}</h3>
			</div>
		)
	}
})