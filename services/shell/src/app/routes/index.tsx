import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {AppLoader} from "@internal/ui-library";

export const Route = createFileRoute('/')({
	pendingComponent: AppLoader,
	component: HomePage
})

function HomePage() {
	const navigate = useNavigate();
	navigate({ to: '/landing', replace: true });

	return null;
}

