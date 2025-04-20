import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {BrandAppLoader} from "@widget/core";

export const Route = createFileRoute('/')({
	pendingComponent: BrandAppLoader,
	component: HomePage
})

function HomePage() {
	const navigate = useNavigate();
	navigate({ to: '/landing', replace: true });

	return null;
}