import {createFileRoute, Outlet, useLocation, useNavigate} from '@tanstack/react-router';
import {useEffect} from "react";

export const Route = createFileRoute('/auth/')({
	component: RouteComponent
})

function RouteComponent() {
	const { pathname, ...params } = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		navigate({
			to: '/auth/login',
			replace: true,
			...params
		})
		.catch(console.error);
	}, [pathname, navigate, params]);

	return (
		<>
			<Outlet />
		</>
	)
}
